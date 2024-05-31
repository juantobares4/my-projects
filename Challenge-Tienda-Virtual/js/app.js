function getDataFromLocalStorage(){
  let data = JSON.parse(localStorage.getItem('data')) || [];

  return data;

}

function saveDataInLocalStorage(data){
  localStorage.setItem('data', JSON.stringify(data));

}

function fetchData(){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
        fetch('https://fakestoreapi.com/products')
          .then(res => res.json())
          .then(json => resolve(json)) // El segundo .then nos parsea la respuesta del primer .then a formato JSON.
          .catch(error => reject(error));
  
    }, 100);

  });

}

function loadingMessage(container){
  let containerLoadingMessage = document.createElement('div');
  let loadingMessage = 'Cargando los productos, por favor espere... ⌛';
  containerLoadingMessage.className = 'loading-container d-flex align-items-center font-card-products';
  containerLoadingMessage.innerHTML = loadingMessage;
  containerLoadingMessage.style.textShadow = '2px 2px 5px rgba(0, 0, 0, 0.5)';
  containerLoadingMessage.style.fontSize = '20px';

  container.appendChild(containerLoadingMessage);

}

function categoriesList(){
  let data = fetchData()

  return data
    .then(products => {
      let arrayCategories = products.map(product => product.category);
      let dataArray = new Set(arrayCategories); // Set es una estructura de datos que no puede almacenar valores duplicados.
      let result = [...dataArray];

      return result;


  })


};

function filterByCategory(nameCategory){
  let allProducts = fetchData();
  let containerProducts = document.getElementById('products-list');
  containerProducts.innerHTML = '';

  return allProducts
    .then(products => {
      let byCategory = products.filter(product => product.category === nameCategory);
      let cards = [];
        
      byCategory.forEach(product => {
        let colDiv = document.createElement('div');
        colDiv.className = 'col-lg-6 mb-4';

        let cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.style.boxShadow = '15px 15px 15px 10px rgba(0, 0, 0, 0.3)';

        let imageProduct = document.createElement('img');
        imageProduct.src = product.image;
        imageProduct.className = 'card-img-top mx-auto d-block';
        imageProduct.style.width = '200px';
        imageProduct.style.height = '200px';
        imageProduct.style.marginTop = '20px';
        imageProduct.style.marginBottom = '20px';
        imageProduct.alt = product.title;

        let cardBody = document.createElement('div');
        cardBody.className = 'card-body text-center';

        let cardTitle = document.createElement('h5');
        cardTitle.className = 'card-title font-card-products';
        cardTitle.style.fontSize = '17px';
        cardTitle.style.lineHeight = '30px';

        let productTitle = `<b>${product.title}</b>`
        cardTitle.innerHTML = productTitle;

        let cardText = document.createElement('p');
        let price = `<b>€${product.price}</b>`;
        cardText.innerHTML = price;
        cardText.style.fontFamily = 'var(--font-products)';
        cardText.style.fontSize = '17px';
        cardText.className = 'card-text';

        let cardButton = document.createElement('button');
        cardButton.className = 'btn btn-warning mb-5 font-buttons';
        cardButton.style.color = 'black';
        cardButton.innerHTML = 'Comprar ahora';

        cardButton.addEventListener('click', () => {
          productDetail(product.id);

        });

        let buttonViewDetail = document.createElement('button');
        buttonViewDetail.className = 'btn btn-secondary ml-1 mb-5 font-buttons';
        buttonViewDetail.style.color = 'black';
        
          buttonViewDetail.addEventListener('click', () => {
            productDetail(product.id);

          });

          buttonViewDetail.innerHTML = 'Más detalles';

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        cardBody.appendChild(cardButton);
        cardBody.appendChild(buttonViewDetail);
        cardDiv.appendChild(imageProduct);
        cardDiv.appendChild(cardBody);
        colDiv.appendChild(cardDiv);

        containerProducts.appendChild(colDiv);
          
        cards.push(cardDiv);

      }); 

      let maxHeight = 0;
      cards.forEach(card => {
            let cardHeight = card.offsetHeight;
            if (cardHeight > maxHeight) {
                maxHeight = cardHeight;
            }
      
      });

      cards.forEach(card => {
            card.style.height = maxHeight + 'px';
      
      });


    });

}

function returnAllTheProducts(){
  allProducts = fetchData();
  let containerProducts = document.getElementById('products-list');
  containerProducts.innerHTML = '';

  return allProducts
    .then(products => {

      loadingMessage(containerProducts);
      
      setTimeout(() => {
        let cards = [];
        containerProducts.innerHTML = '';
      
        products.forEach(product => {
          let colDiv = document.createElement('div');
          colDiv.className = 'col-lg-6 mb-4';

          let cardDiv = document.createElement('div');
          cardDiv.className = 'card';
          cardDiv.style.boxShadow = '15px 15px 15px 10px rgba(0, 0, 0, 0.3)';

          let imageProduct = document.createElement('img');
          imageProduct.src = product.image;
          imageProduct.className = 'card-img-top mx-auto d-block';
          imageProduct.style.width = '200px';
          imageProduct.style.height = '200px';
          imageProduct.style.marginTop = '20px';
          imageProduct.style.marginBottom = '20px';
          imageProduct.alt = product.title;

          let cardBody = document.createElement('div');
          cardBody.className = 'card-body text-center';

          let cardTitle = document.createElement('h5');
          cardTitle.className = 'card-title font-card-products';
          cardTitle.style.fontSize = '17px';
          cardTitle.style.lineHeight = '30px';

          let productTitle = `<b>${product.title}</b>`
          cardTitle.innerHTML = productTitle;

          let cardText = document.createElement('p');
          let price = `<b>€${product.price}</b>`;
          cardText.innerHTML = price;
          cardText.style.fontFamily = 'var(--font-products)';
          cardText.style.fontSize = '17px';
          cardText.className = 'card-text';

          let buttonBuyProduct = document.createElement('button');
          buttonBuyProduct.className = 'btn btn-warning mb-5 font-buttons';
          buttonBuyProduct.style.color = 'black';
          
          buttonBuyProduct.addEventListener('click', () => {
            console.log('Comprando...');

          });

          buttonBuyProduct.innerHTML = 'Añadir al carrito';

          let buttonViewDetail = document.createElement('button');
          buttonViewDetail.className = 'btn btn-secondary ml-1 mb-5 font-buttons';
          buttonViewDetail.style.color = 'black';
          
          buttonViewDetail.addEventListener('click', () => {
            productDetail(product.id);

          });

          buttonViewDetail.innerHTML = 'Más detalles';

          cardBody.appendChild(cardTitle);
          cardBody.appendChild(cardText);
          cardBody.appendChild(buttonBuyProduct);
          cardBody.appendChild(buttonViewDetail);
          cardDiv.appendChild(imageProduct);
          cardDiv.appendChild(cardBody);
          colDiv.appendChild(cardDiv);

          containerProducts.appendChild(colDiv);
            
          cards.push(cardDiv);

        }); 

        let maxHeight = 0;
        cards.forEach(card => {
          let cardHeight = card.offsetHeight;
          if(cardHeight > maxHeight){
            maxHeight = cardHeight;
          
          }
      
        });

        cards.forEach(card => {
          card.style.height = maxHeight + 'px';
        
        });

      }, 2000);
         
    });

}

async function productDetail(idProduct){
  try{
    
    function renderRatingStars(rating){
      let maxStars = 5;
      let starFill = '<img src="images/icons/star-fill.svg" alt="Star">';
      let star = '<img src="images/icons/star.svg" alt="Star">';
      let message = '';
      let roundedRating = Math.round(rating);

      for(let x = 1; x <= maxStars; x++){
        if(x <= roundedRating){
          message += starFill;

        }else{
          message += star;

        }

      }

      return message;

    }

    let dataProducts = await fetchData();
    let findProduct = dataProducts.find(product => product.id === idProduct);
    let modalProduct = document.createElement('div');
    let arrayProduct = [findProduct];

    if(modalProduct){
      modalProduct.remove();
    
    }

    modalProduct.className = 'modal fade';
    modalProduct.id = `modal-product-${idProduct}`; // Se le pasa un ID al modal, basado en el ID del producto que se clickeó, para que dicho modal muestre el producto clickeado y se mantenga actualizado.
    modalProduct.tabIndex = -1; // Nos permite que el modal reciba enfoque mediante JavaScript.

    let modalBodyContent = '<div class="modal-body">';
    
    arrayProduct.forEach(attr => {
      modalBodyContent += `
        <h5 id="titles"><b>${attr.title}</b></h5>
        <br>
        <b id="titles">Precio:</b> €${attr.price}
        <br>
        <br>
        <b id="titles" class="element-rating">Valoración:</b> ${renderRatingStars(attr.rating.rate)} (${attr.rating.rate})
        <br>
        <br>
        <b id="titles">Descripción:</b> ${attr.description}

      `

    })

    modalBodyContent += '</div>';

    modalProduct.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="titles">Detalle del Producto</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          ${modalBodyContent}
          <div class="modal-footer">
            <button type="button" class="btn btn-warning font-buttons" data-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modalProduct);

    $(`#modal-product-${idProduct}`).modal('show'); // Se llama al modal con ID asigando anteriormente.

  }catch{
    throw new Error(console.error('Error.'));

  }

}

function main(){
  returnAllTheProducts(); 
  
}


main();