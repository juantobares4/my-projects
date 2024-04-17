/* Dado un array de números, 
crea una función que utilice map para duplicar cada número en el array y devolver un nuevo array con los resultados. */

let arrayNumbers = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20];

let newArray = arrayNumbers.map(value => value * 2); /* Si la función solo tiene una expresión de retorno, debes omitir las llaves { } 
(en caso de no hacerlo, nos retornará undefined) y la palabra clave return. */

console.log(newArray);