class Person{
  constructor(name, lastName, age, weight, genre){
    this.name = name;
    this.lastName = lastName;
    this.age = age;
    this.weight = weight;
    this.genre = genre;

  }

};

class Student extends Person{
  constructor(name, lastName, age, weight, genre, grade, average){
    super(name, lastName, age, weight, genre)
    this.grade = grade;
    this.average = average;

  }

  setAverage(newAverage){
    this.average = newAverage;

    return `Promedio cambiado con éxito.`

  }

  getData(){
    return `Nombre completo: ${this.name} ${this.lastName} | Edad: ${this.age} | Peso: ${this.weight} | Sexo: ${this.genre} | Año: ${this.grade} | Promedio: ${this.average}`

  }

}

student1 = new Student("Juan Cruz", "Tobares", "23", "85", "Masculino", "3ero", 9);
console.log(student1.getData());
student1.setAverage(7);
console.log(student1.getData());

