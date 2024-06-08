const getLocalStorage = () => {
  let data = localStorage.getItem('data');

  return data ? JSON.parse(data) : [];

}

const saveInLocalStorage = (data) => {
  localStorage.setItem('data', JSON.stringify(data));

}

const fetchApiProducts = (filter) => { // En esta promesa traigo el producto con las características generales, y aparte, traigo su respectivo detalle, para poder utilizar las fotos en el inicio.
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

const filterBy = async(filter) => {
  let filterData = await fetchApiProducts(filter);

  console.log(filterData);

}




