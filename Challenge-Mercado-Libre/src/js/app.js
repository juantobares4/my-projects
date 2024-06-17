const getLocalStorage = () => {
  let data = localStorage.getItem('data');

  return data ? JSON.parse(data) : [];

}

const saveInLocalStorage = (data) => {
  localStorage.setItem('data', JSON.stringify(data));

}

const showToast = (message, title) => {
  toastr.options = {
      "closeButton": true,
      "debug": false,
      "newestOnTop": false,
      "progressBar": true,
      "positionClass": "toast-top-center",
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "5000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
  
  };

  toastr.success(message, title);

}

const fetchCompleteProductsApi = (filter) => { // En esta promesa traigo el producto con las características generales, y aparte, traigo su respectivo detalle, para poder utilizar las fotos en el inicio.
  return new Promise((resolve, reject) => {
    setTimeout(() => {
        fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${filter}`)
          .then(res => res.json())
          .then(json => {
            const selectData = json.results.map(item => ({
              id: item.id,
              title: item.title,
              price: item.price,
              seller: item.seller.nickname, // Nombre del vendedor
              currency: item.currency_id, // Tipo de moneda
              condition: item.condition, // Usado o nuevo
              isFreeShipping: item.shipping.free_shipping, // Envío gratis
              stock: item.available_quantity,
              categoryId: item.category_id,
              attributes: item.attributes, // Atributos del producto

            }))

            const detailPromises = selectData.map(product => // Detalle del producto. Contiene más información (fotos por ej.).
              fetch(`https://api.mercadolibre.com/items/${product.id}`)
                .then(res => res.json())
                .then(detail => ({
                  ...product, // Esto copia los anteriores atributos del producto.
                  images: detail.pictures,
                  warranty: detail.warranty
                
                }))
            
            );

            Promise.all(detailPromises)
            .then(detailedProducts => resolve(detailedProducts))
            .catch(error => reject(error));

          })

          .catch(error => reject(error));
  
    }, 100);

  });

}

const fetchProductDetail = (productId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch(`https://api.mercadolibre.com/items/${productId}`)
        .then(res => res.json())
        .then(json => {
          const selectedData = {
            id: json.id,
            title: json.title,
            price: json.price,
            currency: json.currency_id,
            condition: json.condition,
            attributes: json.attributes,
            images: json.pictures,
            warranty: json.warranty
          
          };
          
          resolve([selectedData]);
        
        })

        .catch(error => reject(error));
    
      }, 100);
  
  });

};

const productByCategory = async(container, filter) => {
  function capitalizeFirstLetter(string){
    return string.substring(0, 1).toUpperCase() + string.substring(1);
  
  }

  let products = await fetchCompleteProductsApi(filter);
  let containerProducts = document.getElementById(container);
  containerProducts.innerHTML = '';

  let carousel = document.createElement('div');
  carousel.className = 'carousel slide';
  carousel.setAttribute('data-ride', 'carousel');

  let carouselId = `product-carousel-${container}`;
  carousel.id = carouselId;

  let indicators = document.createElement('ol');
  indicators.className = 'carousel-indicators';

  let inner = document.createElement('div');
  inner.className = 'carousel-inner';

  let prev = document.createElement('a');
  prev.className = 'carousel-control-prev';
  prev.href = `#${carouselId}`;
  prev.role = 'button';
  prev.setAttribute('data-slide', 'prev');
  prev.innerHTML = '<img src="/public/icons/caret-left-fill.svg" alt="prev">';

  let next = document.createElement('a');
  next.className = 'carousel-control-next';
  next.href = `#${carouselId}`;
  next.role = 'button';
  next.setAttribute('data-slide', 'next');
  next.innerHTML = '<img src="/public/icons/caret-right-fill.svg" alt="next">';

  products.forEach((product, index) => {
    let indicator = document.createElement('li');
    indicator.setAttribute('data-target', `#${carouselId}`);
    indicator.setAttribute('data-slide-to', index);

    if(index === 0){
      indicator.className = 'active';
    
    }

    indicators.appendChild(indicator);

    let carouselItem = document.createElement('div');
    carouselItem.className = `carousel-item${index === 0 ? ' active' : ''}`;

    let img = document.createElement('img');
    img.src = product.images[0].url;
    img.className = 'product-image d-block mx-auto';
    img.alt = product.title;
    img.style.height = '300px';
    img.style.width = '300px';
    img.style.objectFit = 'contain';
    img.style.borderRadius = '30px';
    img.style.padding = '10px';

    let title = document.createElement('h5');
    title.innerHTML = `${product.title}`;
    title.className = 'product-title';

    let description = document.createElement('p');
    description.textContent = product.description;
    description.className = 'product-description';

    let price = document.createElement('p');
    price.innerHTML = `<b>${product.currency}</b> ${product.price}`;
    price.className = 'product-price';

    let shipping = document.createElement('p');
    shipping.innerHTML = `${product.isFreeShipping ? 'Envío Gratis' : ''}`;
    shipping.className = 'product-shipping text-success';

    let containerIcons = document.createElement('div');
    containerIcons.className = 'd-flex justify-content-center align-items-center cointainer-icons';
    
    let horizontalLine = document.createElement('hr');

    let elementIconFav = document.createElement('img');
    let elementIconAddToCart = document.createElement('img');
    let elementProductDetail = document.createElement('a');

    elementIconAddToCart.style.cursor = 'pointer';
    elementIconFav.style.cursor = 'pointer';
    
    elementIconFav.className = 'svg-add-product-to-fav mr-3';
    elementIconAddToCart.className = 'svg-add-product-to-cart mr-3';

    let routeIconFav = '/public/icons/heart.svg';
    let routeIconAddToCart = '/public/icons/bag-plus.svg';

    elementIconFav.src = routeIconFav;
    elementIconFav.style.marginRight = '10px';

    elementIconAddToCart.src = routeIconAddToCart;
    elementIconAddToCart.style.marginBottom = '2px';

    elementProductDetail.text = 'Más detalles...';
    elementProductDetail.style.cursor = 'pointer';
    elementProductDetail.style.textDecoration = 'none';
    elementProductDetail.className = 'link-product-detail ml-2 mt-1 text-info';
    
    containerIcons.appendChild(elementIconFav);
    containerIcons.appendChild(elementIconAddToCart);
    containerIcons.appendChild(elementProductDetail);
    
    elementProductDetail.addEventListener('click', function(event){
      event.stopPropagation();
      productDetail(product.id);

    });
    
    elementIconFav.addEventListener('click', function(event){
      event.stopPropagation();
      addProductToFav(product.id);

    });

    elementIconAddToCart.addEventListener('click', function(event){
      event.stopPropagation();
      addProductToCart(product.id);

    })

    carouselItem.appendChild(img);
    carouselItem.appendChild(title);
    carouselItem.appendChild(description);
    carouselItem.appendChild(price);
    carouselItem.appendChild(shipping);
    carouselItem.appendChild(horizontalLine);
    carouselItem.appendChild(containerIcons);
    inner.appendChild(carouselItem);
  
  });

  carousel.appendChild(indicators);
  carousel.appendChild(inner);
  carousel.appendChild(prev);
  carousel.appendChild(next);

  containerProducts.appendChild(carousel);

  let titleOfSection = document.createElement('h5');
  titleOfSection.className = 'carousel-title';
  titleOfSection.innerHTML = `Productos relacionados a ${capitalizeFirstLetter(filter)}`;

  containerProducts.parentNode.insertBefore(titleOfSection, containerProducts);

};

/* Buscar productos mediante la barra de búsqueda */
const inputDataUser = async(event) => {
  event.preventDefault();
  let inputValue = document.getElementById('inputSearchProduct').value;

  return inputValue;

}

/* Buscar objetos mediante la barra de búsqueda */
const resultsToSearch = async(filter) => {
  let searchUser = inputDataUser();
  let data = await fetchCompleteProductsApi(filter);
  
  console.log(searchUser);
  
}

const counterProductsInMyCart = () => {
  let products = getLocalStorage();
  let myCart = document.getElementById('my-cart');
  let countProducts = products.length;
  let counterElement = document.getElementById('cart-counter'); // Busca el ID del contador de productos.

  if(!counterElement){ // Si counterElement no existe (si es false), lo crea.
    counterElement = document.createElement('p');  
    counterElement.style.fontSize = '11px'
    counterElement.style.color = 'white'; 
    counterElement.className = 'counter-products mr-3 mt-3';
    counterElement.id = 'cart-counter';
    myCart.appendChild(counterElement);

  }

  counterElement.innerHTML = `<b>${countProducts}</b>`;

}

const addProductToFav = async(productId) => {
  try{
    let productDetailApi = await fetchProductDetail(productId);
    let productsInLocalStorage = getLocalStorage();
    let filterProduct = productDetailApi.find(product => {product. id === productId});
    
    productsInLocalStorage.push(filterProduct);
    saveInLocalStorage(productsInLocalStorage);
    
    await counterProductsInMyCart();
    
    setTimeout(() => {
      showToast('Producto agregado con éxito', '¡Producto agregado a Tus Favoritos!');
    }, 100);
    
  }catch(error){
    console.error(error.message);
  
  }  

};

const addProductToCart = async(productId) => {
  try{
    let productsDetailApi = await fetchProductDetail(productId);
    let filterProduct = productsDetailApi.find(product => product.id === productId);
    let productsInLocalStorage = getLocalStorage();

    productsInLocalStorage.push(filterProduct);
    saveInLocalStorage(productsInLocalStorage);

    showToast('Producto agregado con éxito', '¡Producto agregado al carrito!');

    await counterProductsInMyCart();

  }catch(error){
    console.error(error);

  }

}

const viewMyCart = (event) => {
  try{
    if(event){
      event.preventDefault();
    
    }

    let productsInLocalStorage = getLocalStorage();

    if(productsInLocalStorage){
      function deleteDuplicate(array){
        let uniqueProducts = {};
        array.forEach(element => {
          uniqueProducts[element.title] = element; // Esto nos garantiza que no se puedan agregar objetos con el mismo título.
        
        });
      
        return Object.values(uniqueProducts);
        
      }
    
      function countDuplicate(array){
        let countMap = {};
        
        array.forEach(element => {
          if(countMap[element.title]){
            countMap[element.title]++;
          
          }else{
            countMap[element.title] = 1;
            
          }
          
        });
    
        return countMap;
    
      }
    
      let modalBodyContent = '<div class="modal-body">';
      let noneDuplicate = deleteDuplicate(productsInLocalStorage);
      let count = countDuplicate(productsInLocalStorage);
    
      if(productsInLocalStorage.length > 0){
        noneDuplicate.forEach(attr => {
          let productCount = count[attr.title];
          let totalPrice = attr.price * productCount;
          let productImage = attr.images[0].url;

          modalBodyContent += `
            <div class="d-flex align-items-start mb-4">
              <img class="image-product-to-cart" src="${productImage}" style="margin-right: 20px;">
              <div>
                <h5 class="titles"><b>${attr.title}</b></h5>
                <p class="titles"><b>Precio: €${attr.price} | Cantidad: ${productCount} | Total: €${totalPrice.toFixed(2)} |</b><a class="link-remove m-3" onclick="removeProductToCart(${attr.id})"><img class="mr-1 mb-1" src="/images/icons/trash3-fill.svg">Remover</a></p>
              </div>
            </div>
            <hr class="horizontal-line my-2">
          `;

          });      
          
      }else if(productsInLocalStorage.length === 0){
        let message = `
          <div class="d-flex align-items-center justify-content-center">
            <img class="empty-cart" src="images/pngwing.com.png">
          </div>
          <h4 class="justify-content-center text-center title-empty-cart">¡Tu carrito de compras está vacío!</h4>

        `
        modalBodyContent += message;
        
      };
        
      modalBodyContent += '</div>';
      
      let modalCart = document.getElementById('modal-cart');
      
      if(!modalCart){ 
        modalCart = document.createElement('div');
        let bagCheckImg = '/images/icons/bag-dash-fill.svg';
        modalCart.className = 'modal fade';
        modalCart.id = 'modal-cart';
        modalCart.tabIndex = -1;
        
        modalCart.innerHTML = `
          <div class="modal-dialog custom-modal-cart">
            <div class="modal-content">
              <div class="modal-header align-items-center text-center">
                <h5 class="modal-title titles">
                  <img src="${bagCheckImg}" class="ml-3 mr-3 img-cart">Mi carrito
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              ${modalBodyContent}
              <div class="modal-footer">
                <button type="button" id='close-mycart' class="btn btn-warning font-buttons" data-dismiss="modal">Cerrar</button>
              </div>
            </div>
          </div>
        `;
        document.body.appendChild(modalCart);
      
      }else{
        modalCart.querySelector('.modal-body').innerHTML = modalBodyContent;
      
      }
            
        $(`#modal-cart`).modal('show'); // Se llama al modal con ID asignado anteriormente.  
  
      }  

  }catch(error){
    console.error(error);

  }

}  

const main = async() => {
  productByCategory('carousel-by-sports-products', 'deportes');
  productByCategory('carousel-by-tecnology-products', 'electrónica');
  productByCategory('carousel-by-home-products', 'hogar');
  counterProductsInMyCart();

}

main();