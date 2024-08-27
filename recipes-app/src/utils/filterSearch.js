import { getDataFromLocalStorage } from "./localstorage";

export const filterSearch = (param) => {
  let recipes = getDataFromLocalStorage('recipe');
  
  let filterResults = recipes.filter(recipe => recipe.title.toLowerCase().includes(param.toLowerCase()) || recipe.category.toLowerCase().includes(param.toLowerCase()));

  return filterResults;

  // Si esta función no tiene un parametro para filtrar, trae todas las recetas del localstorage.

};
