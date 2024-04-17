let productos = [
    { nombre: "Camisa", precio: 30, descuento: 10 },
    { nombre: "Pantalón", precio: 50, descuento: 15 },
    { nombre: "Zapatos", precio: 80, descuento: 20 },
    { nombre: "Chaqueta", precio: 100, descuento: 25 },
    { nombre: "Bufanda", precio: 20, descuento: 5 },
    { nombre: "Gorra", precio: 15, descuento: 0 },
    { nombre: "Calcetines", precio: 10, descuento: 0 },
    { nombre: "Reloj", precio: 120, descuento: 30 },
    { nombre: "Bolsa", precio: 40, descuento: 10 },
    { nombre: "Gafas de sol", precio: 60, descuento: 15 }
  ];

function orderProducts(products){
  let filterProducts = products.map(product => ({Nombre: product.nombre, PrecioFinal: product.precio - (product.precio * (product.descuento / 100)), Descuento: product.descuento})).filter(product => product.PrecioFinal > 50); 
  /* Preguntar porque si pongo paréntesis en la expresión de retorno debo omitir la palabra return */

  console.table(filterProducts);
  return filterProducts;

}

function filterByDiscount(){
  filterProducts = orderProducts(productos);
  let filterDiscount = filterProducts.find(product => product.Descuento === 20);

  return `Nombre del producto: ${filterDiscount.Nombre} | Descuento: ${filterDiscount.Descuento}`;

}

orderProducts(productos);
console.log(filterByDiscount());
