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
