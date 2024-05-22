let players = [
  {
    posicion:'Arquero',
    nombre:'Franco Armani'

  },
  {
    posicion:'Arquero',
    nombre: 'Ezquiel Centurión'

  },
  {
    posicion: 'Defensor',
    nombre: "Agustín Sant'anna"

  },
  {
    posicion: 'Mediocampista',
    nombre: 'Claudio Echeverri'

  },
  {
    posicion: 'Delantero',
    nombre: 'Miguel Ángel Borja'

  }

]

players.forEach(player => {
  switch(player.posicion){
    case 'Arquero':
      console.log(player.nombre);
      break

    case 'Defensor':
      console.log(player.nombre);
      break

    case 'Mediocampista':
      console.log(player.nombre);
      break

    case 'Delantero':
      console.log(player.nombre);
      break

  }

})