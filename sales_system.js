class Product{
  static productsCounter = 0;

  constructor(name, price){
    this.IdProduct = ++Product.productsCounter;
    this.name = name;
    this.price = price;

  };

  get id(){
    return `${this.IdProduct}`;

  };

  get nameProduct(){
    return `${this.name}`;

  }

  get priceProduct(){
    return `${this.price}`;

  }

  set nameProduct(newName){
    this.name = newName;

    return `Nombre cambiado con éxito.`;

  };

  set priceProduct(newPrice){
    this.price = newPrice;

    return `Precio cambiado con éxito.`;

  };

  toString(){
    return `${this.IdProduct} | ${this.name}: $${this.price}`;

  };

};

class Order{
  static ordersCounter = 0;
  static maxProducts = 5;

  #productsList = [];

  constructor(products = []){
    this.#productsList = products;
    this.totalProducts = this.#productsList.length;
    this.IdOrder = ++Order.ordersCounter;

  };

  addProduct(...product){ // Parámetros REST
    let totalProducts = this.#productsList.length + product.length;

    if (totalProducts <= Order.maxProducts) {
      this.#productsList.push(...product); // Spread Operator

    } else {
      console.log(`Solo puedes agregar 5 productos en el carrito.`);

    };

  }; 

  orderPrice(){
    let accumulator = this.#productsList.reduce((add, item) => {
      return add + item.price

    }, 0);

    return `Precio total: $${accumulator}`;

  };

  totalProductsInCart(){
    return `Total de productos en el carrito: ${this.#productsList.length}`;

  };

  toString(){
    console.log(`Orden Nro.: ${this.IdOrder}\n`);

    this.#productsList.forEach(product => {

      console.log(`${product.toString()}`); // productsList es un array de objetos de la clase Product, entonces puedo acceder a sus métodos.

    });

    console.log(`\nPrecio total de la compra: $${this.orderPrice()}`);

  };

};

let myProducts = [
    new Product(
      'Teclado Corsair',
      245
  
    ),
    new Product(
      'Mouse Redragon',
      300
  
    ),
    new Product(
      'Placa de video RTX 5090',
      2000

    )
  
];

let newProduct1 = new Product('Procesador Ryzen 5000', 200);
let newProduct2 = new Product('Procesador Ryzen 7000', 400);
let newProduct3 = new Product('Disco SSD 1TB', 90);

let myOrder = new Order(myProducts);

myOrder.addProduct(newProduct1, newProduct2);
myOrder.addProduct(newProduct3);
myOrder.toString();

