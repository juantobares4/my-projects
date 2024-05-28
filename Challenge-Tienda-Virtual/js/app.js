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

        let cardButton = document.createElement('a');
        cardButton.href = '#';
        cardButton.className = 'btn btn-warning mb-5 font-buttons';
        cardButton.style.color = 'black';
        cardButton.innerHTML = 'Comprar ahora';

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        cardBody.appendChild(cardButton);
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
  let cartSection = document.getElementById('cart-section');
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

          let cardButton = document.createElement('a');
          cardButton.href = `/shopping-cart.html/${product.id}`;
          cardButton.className = 'btn btn-warning mb-5 font-buttons';
          cardButton.style.color = 'black';
          cardButton.innerHTML = 'Comprar ahora';

          cardBody.appendChild(cardTitle);
          cardBody.appendChild(cardText);
          cardBody.appendChild(cardButton);
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

function main(){
  returnAllTheProducts(); 
  
}

main();