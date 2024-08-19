export const getDataFromLocalStorage = (key) => {
  let data = localStorage.getItem(key);

  return data ? JSON.parse(data) : [];

};

export const saveDataInLocalStorage = (value) => {
  localStorage.setItem('recipe', JSON.stringify(value));
  
  // Es mejor pasarle una clave y un valor distintos para poder reutilizar la función, de forma que no se sobreescriba la información almacenada. 

};

export const deleteDataFromLocalStorage = (key) => {
  localStorage.removeItem(key);

};