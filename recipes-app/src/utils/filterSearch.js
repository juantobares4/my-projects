import { getDataFromLocalStorage } from "./localstorage";

export const filterSearch = (param) => {
  let recipes = getDataFromLocalStorage('recipe');
  
  let filterResults = recipes.filter(recipe => recipe.title.toLowerCase().includes(param.toLowerCase()) || recipe.category.toLowerCase().includes(param.toLowerCase())); // El método includes verifica si "param" está dentro del valor recipe.title o recipe.category. Devolviendo un array con todos los objetos que cumplen con esa condición.

  return filterResults;

  // Si esta función no tiene un parametro para filtrar, trae todas las recetas del localstorage.

};
