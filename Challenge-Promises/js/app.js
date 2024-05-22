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
    let startersPlayers = players.filter(player => player.state === 'Titular').length
    let findPlayer = players.find(player => player.name === playerName && player.lastName === playerLastName);

    if(findPlayer){
      throw new Error('El jugador ya forma parte de tu plantilla.');
  
    }else if(startersPlayers === 11){
      throw new Error('No podés tener más de 11 jugadores titulares en tu plantel');

    }

    players.push(player);
    
    savePlayersInLocalStorage(players);

    await new Promise(resolve => setTimeout(resolve, 500));

    alert('El jugador fue agregado a tu plantilla correctamente.');
    
    await playersList();

  }catch(error){
    alert(error);
  
  }

  playerName = document.getElementById('playerName').value = '';
  playerLastName = document.getElementById('playerLastName').value = '';
  playerPosition = document.getElementById('position').value = '';
  playerAge = document.getElementById('playerAge').value = '';


};

// Función asíncrona para listar todos los jugadores del equipo
const playersList = async() => {
  let team = getPlayersFromLocalStorage();
  let containerTeam = document.getElementById('container-team');
  let image = document.querySelector('.background-image-team'); // QuerySelector nos permite seleccionar por clase.

  if(team.length > 0){
    containerTeam.innerHTML = '';

    /* Creamos elementos para la tabla del equipo */
    
    let table = document.createElement('table');
    let tbody = document.createElement('tbody');
  
    containerTeam.style.display = 'block';
  
    if(image){
      image.remove();

    }
    
    let elementContainerTitle = document.createElement('h4');
    let title = 'Plantel';
  
    elementContainerTitle.style.fontFamily = 'jacksonville';
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
    table.style.backgroundColor = '#439F52';
    containerTeam.appendChild(table);

  }else if(team.length === 0){
    containerTeam.innerHTML = '';

    let message = 'No hay jugadores en tu plantilla.';
    let elementMessage = document.createElement('h4');

    elementMessage.innerHTML = message;
    elementMessage.style.fontFamily = 'jacksonville';

    image.style.width = '70px';
    image.style.height = '70px';
    image.style.padding = '8px';

    elementMessage.classList.add('text-center');

    containerTeam.appendChild(image);
    containerTeam.appendChild(elementMessage);

  }

};

// Función asíncrona para asignar una nueva posición a un jugador
const asignarPosicion = async (nombreJugador, nuevaPosicion) => {
  let team = getPlayersFromLocalStorage();
  let goalkeepers = team.filter(player => player.position === 'Arquero');
  let defenders = team.filter(player => player.position === 'Defensor');
  let midfielders = team.filter(player => player.position === 'Mediocampista');
  let forwards = team.filter(player => player.position === 'Delantero');
  let sortTeam = [goalkeepers, defenders, midfielders, forwards];
  
  let sectionTeam = document.getElementById('section-team');
  let containerSortTeam = document.getElementById('sort-team');
  containerSortTeam.innerHTML = ''; // Limpiar contenido previo
  let table = document.createElement('table');
  let tbody = document.createElement('tbody');

  // Hace un scroll suave a la sección.
  sectionTeam.scrollIntoView({
      behavior: 'smooth'
  });

  sortTeam.forEach(forPositions => {
      for(let player of forPositions){
          let row = document.createElement('tr'); // Crear una nueva fila para cada jugador

          let td = document.createElement('td');
          td.style.border = '2px solid black';
          td.style.backgroundColor = 'antiquewhite';
          td.style.padding = '7px';
          td.style.fontFamily = 'Audiowide';
          td.style.fontSize = '13px';
          td.innerHTML = `${player.position}<b>Nombre: </b> ${player.name} | <b>Apellido: </b> ${player.lastName}</i> | Edad: <i>${player.age}</i>`;
          row.appendChild(td);

          tbody.appendChild(row); // Agregar la fila al cuerpo de la tabla
      
        }
  
  });

  table.appendChild(tbody);
  table.style.boxShadow = '15px 15px 15px 15px rgba(0, 0, 0, 0.3)';
  table.style.backgroundColor = '#439F52';
  table.style.width = '100%'; // Asegura que la tabla ocupe todo el ancho del contenedor
  table.style.marginTop = '20px'; // Agrega espacio encima de la tabla

  containerSortTeam.appendChild(table);

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
