class Book{
  constructor(title, creator, year){
    this.title = title;
    this.creator = creator;
    this.year = year;

  }

  changeAttributes(newTitle, newCreator, newYear){
    this.title = newTitle;
    this.name = newCreator;
    this.year = newYear;

    return `Nuevas características asignadas con éxito.`
    
  }
  
  showAttributes(){
    return `${this.title.toUpperCase()}
    - Autor: ${this.name}
    - Año de publicación: ${this.year}
    `

  }

}

libro = new Book("Harry Potter y la piedra filosofal", "J.K.Rowling", "2002");
console.log(libro.changeAttributes("Harry Potter y el misterio del Príncipe Mestizo", "J.K.Rowling" ,"2004"));
console.log(libro.showAttributes());
