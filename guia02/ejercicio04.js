let personas = [
    { nombre: "Juan", edad: 25 },
    { nombre: "María", edad: 30 },
    { nombre: "Pedro", edad: 40 },
    { nombre: "Ana", edad: 35 },
    { nombre: "Luis", edad: 22 },
    { nombre: "Sofía", edad: 28 },
    { nombre: "Carlos", edad: 45 },
    { nombre: "Laura", edad: 33 },
    { nombre: "David", edad: 29 },
    { nombre: "Elena", edad: 27 }
  ];

function legalPerson(people){
  let filterPerson = people.map(person => ({'nombre': person.nombre.toString().toLocaleUpperCase(), 'edad': person.edad})).filter(person => person.edad > 18).find(person => person.edad === 25);

  return `${filterPerson.nombre}, ${filterPerson.edad} años.`;

}

console.log(legalPerson(personas));