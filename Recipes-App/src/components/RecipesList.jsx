import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { getDataFromLocalStorage, saveDataInLocalStorage } from '../utils/localstorage';
import { Recipe } from './Recipe';
import { ImageComponent } from './ImageComponent';

import imgDescriptCard from '../assets/flat-lay-assortment-with-delicious-brazilian-food.jpg';
import recipesLogo from '../assets/recipe_9757071.png';
import search from '../assets/search.svg';
import '../styles/RecipesList.css';

import { filterSearch } from '../utils/filterSearch';
import { useStore } from '../context/useStore';

export const RecipesList = () => {
  const { user } = useStore();
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (!user || !user.username) return;

    const recipesFromStorage = getDataFromLocalStorage(user.username);
    setRecipes(Array.isArray(recipesFromStorage) ? recipesFromStorage : []);
  }, [location.key, user]);

  useEffect(() => {
    if (!user || !user.username) return;

    saveDataInLocalStorage(user.username, recipes);
  }, [recipes, user]);

  const filteredResults = filterSearch(searchTerm, recipes);

  const removeRecipe = (id) => {
    const updatedRecipes = recipes.filter(recipe => recipe.id !== id);
    setRecipes(updatedRecipes);
  };

  return (
    <>
      <div className='d-flex justify-content-center align-items-center container-title-of-section'>
        <ImageComponent src={recipesLogo} stylesClass={'img-title'} />
        <div>
          <h2 className="ms-5 text-start"><b>Mi libro</b><br /> de<br />recetas</h2>
        </div>
        <hr className='w-50 ms-5 me-5' />
      </div>

      <section className='custom-bg p-5'>
        <form>
          <div className="input-group">
            <span className="input-group-text" id="basic-addon1">
              <ImageComponent src={search} />
            </span>
            <input
              type="text"
              className="form-control me-3"
              placeholder="Título o Categoría"
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={searchTerm}
              onChange={event => setSearchTerm(event.target.value)}
            />
          </div>
        </form>

        {
          filteredResults.length > 0 ? (
            <div className='row mt-5'>
              {filteredResults.map(recipe => (
                <div className='col-12 col-sm-6 col-md-4 mb-4' key={recipe.id}>
                  <Recipe
                    id={recipe.id}
                    styles={'my-5 d-flex justify-content-center align-items-center flex-column shadow'}
                    name={recipe.title}
                    category={recipe.category}
                    img={imgDescriptCard}
                    removeRecipe={removeRecipe}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className='d-flex justify-content-center align-items-center' style={{ marginBlock: '80px' }}>
              <h5 className='text-start mt-5 lh-5'>
                <b>No hay</b><br /> recetas<br /> para mostrar
              </h5>
            </div>
          )
  
        }
  
      </section>
  
    </>

  );

};
