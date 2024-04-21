/* Obtengo los ID de los elementos que voy a necesitar */ 

let tasks = document.getElementById("formTask"); // ID del formulario donde se pasan las tareas.
let clearTasks = document.getElementById('clearTasks'); // ID del botón para vaciar el listado de tareas.
let response = document.getElementById('tasks'); // Obtenemos el ID del elemento donde mostraremos el listado de tareas.
let searchTask = document.getElementById('searchTask'); // ID del formulario de la barra de búsqueda.

let arrayTasks = [];
let taskIdCounter = 0;

// Creo eventos
tasks.addEventListener("submit", receiveTasks); // Evento para enviar tareas a la lista.
clearTasks.addEventListener("click", emptyTasks); // Evento para vaciar la lista de tareas.
searchTask.addEventListener("submit", searchForTask); /* Evento para filtrar por tarea en la barra de búsqueda | 
Debe ser tipo "submit" porque si no no se vincula con la función si es de tipo "click". */

// Función que se ejecuta al enviar el formulario
function receiveTasks(event) {
  event.preventDefault(); // Evitar que se recargue la página al enviar el formulario.

  // Obtener los valores del formulario
  let nameTask = document.getElementById("inputTask").value;
  let categoryTask = document.getElementById("inputCategory").value;
  let isComplete = document.getElementById('isComplete').checked;
  
  // Creo un objeto con los datos de la tarea
  const userTask = {
    name: nameTask,
    category: categoryTask,
    completed: isComplete

  };

  arrayTasks.push(userTask);

  /* Limpiamos el contenido del formulario y del div donde se van colocando las tareas */
  document.getElementById("inputTask").value = "";
  document.getElementById("inputCategory").value = "";
  document.getElementById('isComplete').checked = false;
  
  response.innerHTML = ""; // Esto garantiza que no haya duplicados ni contenido antiguo.

  arrayTasks.forEach(task => {
    let taskItem = document.createElement('div'); // Creamos el elemento. 
    let taskText = `<b>Nombre de la tarea:</b> ${task.name} | <b>Categoría:</b> ${task.category} | <b>Completada:</b> ${task.completed ? 'Sí' : 'No'}`;
    
    taskItem.innerHTML = taskText; // TextContent inserta texto plano | InnerText nos permite insertar etiquetas HTML.
    
    /* Le damos estilos al nuevo elemento que se ira creando */
    taskItem.style.border = '1px solid rgba(0, 0, 0, 0.2)';
    taskItem.style.backgroundColor = '#FFEE58';

    response.appendChild(taskItem);

  })
  

}

// Función que se ejecuta al clickear el botón "Vaciar tareas"
function emptyTasks(){
  response.innerHTML = ''; // Si quiero vaciar utilizando remove(), después no puedo volver a llenar el listado nuevamente.

  arrayTasks = []; // Vacío el array también.

}

function filterTasksComplete(){ // Filtra solo por tareas completadas.
  response.innerHTML = ''; // Esto garantiza que no haya duplicados ni contenido antiguo.
  let completedTasks = arrayTasks.filter(task => task.completed === true);

  if(completedTasks.length > 0){
      completedTasks.forEach(task => {
      let text = `<b>Nombre de la tarea:</b> ${task.name} | <b>Categoría:</b> ${task.category} | <b>Completada:</b> ${task.completed ? 'Si' : ''}`;
      let taskItem = document.createElement('div');
      
      taskItem.innerHTML = text;
  
      taskItem.style.border = '1px solid rgba(0, 0, 0, 0.2)';
      taskItem.style.backgroundColor = '#FFEE58';
      
      response.appendChild(taskItem);  
    
    });
      
  }else{
    let text = `<b>No hay tareas completas para mostrar.</b>`
    let taskItem = document.createElement('div');
      
    taskItem.innerHTML = text;

    response.appendChild(taskItem);

  }  

}

function filterTasksInclomplete(){
  response.innerHTML = ''; // Esto garantiza que no haya duplicados ni contenido antiguo.
  let incompletedTasks = arrayTasks.filter(task => task.completed === false);

  if(incompletedTasks.length > 0){
      incompletedTasks.forEach(task => {
      let text = `<b>Nombre de la tarea:</b> ${task.name} | <b>Categoría:</b> ${task.category} | <b>Completada:</b> ${task.completed ? 'Si' : 'No'}`;
      let taskItem = document.createElement('div');
      
      taskItem.innerHTML = text;
  
      taskItem.style.border = '1px solid rgba(0, 0, 0, 0.2)';
      taskItem.style.backgroundColor = '#FFEE58';
      
      response.appendChild(taskItem);
    
    });
      
  }else{
    let text = `<b>No hay tareas incompletas para mostrar.</b>`
    let taskItem = document.createElement('div');
      
    taskItem.innerHTML = text;

    response.appendChild(taskItem);

  }

}

function filterAllTasks(){
  response.innerHTML = '';
  
  if(arrayTasks.length > 0){
    arrayTasks.forEach(task => {
      let text = `<b>Nombre de la tarea:</b> ${task.name} | <b>Categoría:</b> ${task.category} | <b>Completada:</b> ${task.completed ? 'Si' : 'No'}`;
      let taskItem = document.createElement('div');

      taskItem.innerHTML = text;

      taskItem.style.border = '1px solid rgba(0, 0, 0, 0.2)';
      taskItem.style.backgroundColor = '#FFEE58';
      
      response.appendChild(taskItem); 

    });

  }else{
    let text = `<b>No hay tareas para mostrar.</b>`
    let taskItem = document.createElement('div');
      
    taskItem.innerHTML = text; // TextContent inserta texto plano | InnerText nos permite insertar etiquetas HTML.

    response.appendChild(taskItem);

  };

} 

function searchForTask(event){
  event.preventDefault();
  response.innerHTML = ''; // Eliminamos duplicados en el elemento donde mostraremos todo.
  
  let inputTask = document.getElementById('nameTask').value;
  let coincidence = arrayTasks.filter(task => task.name === inputTask) /* Creamos un nuevo array solo con el nombre
  de la tarea filtrada. */

  if(coincidence.length === 0){
    let text = `<b>No hay resultados de la búsqueda.</b>`;
    let resultsElement = document.createElement('div');

    resultsElement.innerHTML = text;

    response.appendChild(resultsElement);

  }else if(coincidence.length > 0){
    coincidence.forEach(task => {
      let title = `<b>Resultados de la búsqueda:</b><br>`
      let text = `${title}<b>Nombre de la tarea:</b> ${task.name} | <b>Categoría:</b> ${task.category} | <b>Completada:</b> ${task.completed ? 'Si' : 'No'}`;
      let resultsElement = document.createElement('div');
  
      resultsElement.innerHTML = text;
  
      resultsElement.style.border = '1px solid rgba(0, 0, 0, 0.2)';
      resultsElement.style.backgroundColor = '#FFEE58';
      
      response.appendChild(resultsElement);

    });

  }
 
}