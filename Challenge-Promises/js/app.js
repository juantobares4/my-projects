// Función para obtener los jugadores del localStorage
const getPlayersFromLocalStorage = () => {
  const jugadoresString = localStorage.getItem('players');
  return jugadoresString ? JSON.parse(jugadoresString) : [];

};

// Función para guardar los jugadores en el localStorage
const savePlayersInLocalStorage = (players) => {
  localStorage.setItem('players', JSON.stringify(players));

};

const addPlayer = async(event) => {
  event.preventDefault();
  
  try{
    let playerName = document.getElementById('playerName').value;
    let playerLastName = document.getElementById('playerLastName').value;
    let playerPosition = document.getElementById('position').value;
    let playerAge = document.getElementById('playerAge').value;
    let playerState;
  
    if(!playerName || !playerLastName || !playerAge || !playerPosition){
      throw new Error('Por favor, completá todos los campos.');

    }

    if(document.getElementById('starter').checked){
      playerState = 'Titular';
      
    }else if(document.getElementById('substitute').checked){
      playerState = 'Suplente';
      
    }

    let player = {
      name: playerName,
      lastName: playerLastName,
      age: playerAge,
      position: playerPosition,
      state: playerState

    }
    
    let players = getPlayersFromLocalStorage();
  
    let findPlayer = players.find(player => player.name === playerName);
  
    if(findPlayer){
      throw new Error('El jugador ya forma parte de tu plantilla.');
  
    }
    
    players.push(player);
    
    savePlayersInLocalStorage(players);

    await new Promise(resolve => setTimeout(resolve, 1000));

    alert('El jugador fue agregado a tu plantilla correctamente.');

  }catch(error){
    alert(error);
  
  }

};


// Función asíncrona para listar todos los jugadores del equipo
const listarJugadores = async() => {
  let players = getPlayersFromLocalStorage();

  let encontrado = players.find(player => player.name === 'Franco');

  console.log(players);

};

// Función asíncrona para asignar una nueva posición a un jugador
const asignarPosicion = async (nombreJugador, nuevaPosicion) => {
  // Implementación para asignar una nueva posición a un jugador
};

// Función asíncrona para realizar un cambio durante un partido
const realizarCambio = async (jugadorEntrante, jugadorSaliente) => {
  // Implementación para realizar un cambio durante un partido
};

// Función principal asíncrona que interactúa con el usuario
const main = async () => {
  try {
    // Lógica para interactuar con el usuario y llamar a las funciones adecuadas
  } catch (error) {
    console.error('Error:', error);
  }
};

// Llamar a la función principal para iniciar la aplicación
main();
