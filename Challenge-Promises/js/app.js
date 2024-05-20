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
  
    let findPlayer = players.find(player => {
      player.name === playerName && player.lastName === playerLastName

      });
  
    if(findPlayer){
      throw new Error('El jugador ya forma parte de tu plantilla.');
  
    }
    
    players.push(player);
    
    savePlayersInLocalStorage(players);

    await new Promise(resolve => setTimeout(resolve, 500));

    alert('El jugador fue agregado a tu plantilla correctamente.');

  }catch(error){
    alert(error);
  
  }

  playerName = document.getElementById('playerName').value = '';
  playerLastName = document.getElementById('playerLastName').value = '';
  playerPosition = document.getElementById('position').value = '';
  playerAge = document.getElementById('playerAge').value = '';

  listarJugadores();

};


// Función asíncrona para listar todos los jugadores del equipo
const listarJugadores = async() => {
  let team = getPlayersFromLocalStorage();
  let containerTeam = document.getElementById('container-team');
  let image = document.querySelector('.background-image-team');
  let goalkeepers = team.filter(player => player.position === 'Arquero');
  let defenders = team.filter(player => player.position === 'Defensor');
  let midfielders = team.filter(player => player.position === 'Mediocampista');
  let forwards = team.filter(player => player.position === 'Delantero');
  
  console.log(goalkeepers, defenders, midfielders, forwards);
  
  /* Creamos elementos para la tabla del equipo */
  let table = document.createElement('table');
  let tbody = document.createElement('tbody');

  containerTeam.style.display = 'block';

  image.remove();
  
  let elementContainerTitle = document.createElement('h4');
  let title = 'Plantel';

  elementContainerTitle.style.fontFamily = 'jacksonville';
  elementContainerTitle.style.botde
  elementContainerTitle.style.padding = '10px'; 
  elementContainerTitle.innerHTML = title;

  table.appendChild(elementContainerTitle);

  /* Creamos filas de la tabla */
  
  team.forEach(element => {
    let row = document.createElement('tr');
    
    Object.values(element).forEach(text => {
      let td = document.createElement('td');
      td.style.border = '2px solid black';
      td.style.backgroundColor = 'antiquewhite';
      td.style.padding = '7px';
      td.style.fontFamily = 'Audiowide';
      td.style.fontSize = '13px';
      td.innerHTML = `<i>${text}</i>`;
      row.appendChild(td);
      
    });
    
    tbody.appendChild(row);
    
    
  });
  
  table.appendChild(tbody)
  table.style.boxShadow = '15px 15px 15px 15px rgba(0, 0, 0, 0.3)';
  containerTeam.appendChild(table);

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
