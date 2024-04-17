/* Dado un array de números, crea una función que utilice filter 
para filtrar solo los números pares y devolver un nuevo array con esos números. */

let arrayNumbers = [23, 67, 43, 95, 22, 68, 21, 18, 15, 84, 55];

let newArrayPeers = arrayNumbers.filter(number => number % 2 === 0);

console.log(newArrayPeers);