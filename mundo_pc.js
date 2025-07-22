class InputDevice{
  constructor(inputType, brand){
    this._inputType = inputType
    this._brand = brand

  };

  set brand(newBrand){
    this._brand = newBrand;

  }

  set inputType(newInputType){
    this._inputType = newInputType;

  };

  get brand(){
    return `${this._brand}`;

  };

  get inputType(){
    return `${this._inputType}`;
  
  };

};

class Keyboard extends InputDevice{
  static keyboardsCounter = 0;
  
  constructor(inputType, brand){
    super(inputType, brand);
    this.idKeyboard = ++Keyboard.keyboardsCounter;

  };

  toString(){
    return `${this.idKeyboard} | ${this.brand} | ${this.inputType}`;

  };

};

class Mouse extends InputDevice{
  static miceCounter = 0; // Mice plural de mouse
  
  constructor(inputType, brand){
    super(inputType, brand);
    this.idMouse = ++Mouse.miceCounter;

  };

  toString(){
    return `${this.idMouse} | ${this.brand} | ${this.inputType}`;

  };

};

class Monitor{
  static monitorsCounter = 0;
  
  constructor(brand, inches){
    this.idMonitor = ++Monitor.monitorsCounter;
    this._brand = brand;
    this._inches = inches;

  };

  get brand(){
    return `${this._brand}`;

  };

  get inches(){
    return `${this._inches}"`;

  };

  set brand(newBrand){
    this._brand = newBrand;

  };

  set inches(newValue){
    this._inches = newValue;

  };

  toString(){
    return `${this.idMonitor} | ${this._brand} | ${this._inches}"`;

  };

};

class Computer{
  static computersCounter = 0;

  constructor(name, monitor, keyboard, mouse){
    this.idComputer = ++Computer.computersCounter;  
    this._name = name;
    this._monitor = monitor;
    this._keyboard = keyboard;
    this._mouse = mouse;

  };

  get name(){
    return `${this._name}`;

  };

  get monitor(){
    return `${this._monitor}`;

  };

  get keyboard(){
    return `${this._keyboard}`;

  };

  get mouse(){
    return `${this._mouse}`;

  };

  set name(newName){
    this._name = newName;

  };

  set monitor(newMonitor){
    this._monitor = newMonitor;

  };

  set keyboard(newKeyboard){
    this._keyboard = newKeyboard;

  };

  set mouse(newMouse){
    this._mouse = newMouse;

  };

  toString(){
    return `ID: ${this.idComputer} | ${this._name}
      Teclado: ${this.keyboard.toString()}
      Monitor: ${this.monitor.toString()}
      Ratón: ${this.mouse.toString()}
    
    `;

  };

};

class Order{
  static ordersCounter = 0;
  #computers = [];

  constructor(computer = []){
    this.idOrder = ++Order.ordersCounter;
    this.#computers = computer;

  };

  get totalProducts(){
    return this.#computers.length;

  };

  addComputer(...computer){
    this.totalComputersInOrder++

    this.#computers.push(...computer);

  };

  orderData(){  
    return `Orden Nro.: ${this.idOrder} | Cantidad de productos: ${this.totalProducts}\n`;

  };

  viewOrder(){  
    console.log(this.orderData());
    
    this.#computers.forEach(computer => {
      console.log(computer.toString());

    });

  };

};

// Crear dispositivos para PC1
const monitor1 = new Monitor("Samsung", 24);
const keyboard1 = new Keyboard("USB", "Logitech");
const mouse1 = new Mouse("Wireless", "HP");

const pc1 = new Computer("Workstation", monitor1, keyboard1, mouse1);

// Crear dispositivos para PC2
const monitor2 = new Monitor("LG", 27);
const keyboard2 = new Keyboard("Bluetooth", "Microsoft");
const mouse2 = new Mouse("USB", "Razer");

const pc2 = new Computer("Gaming Rig", monitor2, keyboard2, mouse2);

// Crear dispositivos para PC3
const monitor3 = new Monitor("Acer", 21);
const keyboard3 = new Keyboard("USB", "Redragon");
const mouse3 = new Mouse("Wireless", "Logitech");

const pc3 = new Computer("Home Office", monitor3, keyboard3, mouse3);

const monitor4 = new Monitor("Acer", 21);
const keyboard4 = new Keyboard("USB", "Redragon");
const mouse4 = new Mouse("Wireless", "Logitech");

const pc4 = new Computer("Home Office", monitor3, keyboard3, mouse3);

// Crear una orden con varias computadoras
const orden1 = new Order([pc1, pc2]);

const order2 = new Order([pc1]);

order2.viewOrder();

// Agregar otra computadora luego
orden1.addComputer(pc3, pc4);

// Mostrar la orden
orden1.viewOrder();

