class Person{
  constructor(name, lastName, age, genre){
    this.name = name;
    this.lastName = lastName;
    this.age = age;
    this.genre = genre;

  }

  get dataPerson(){
    return `Nombre completo: ${this.name} ${this.lastName} | Edad: ${this.age} | Género: ${this.genre}`;

  };

}

firstPerson = new Person("Juan Cruz", "Tobares", 23, "Macho Meno");
console.log(firstPerson.dataPerson);
