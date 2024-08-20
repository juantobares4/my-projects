import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

import '../styles/Form.css'

import { ImageComponent } from './ImageComponent'
import { saveDataInLocalStorage, getDataFromLocalStorage } from '../utils/localstorage.js'
import formImage from '../assets/chef_4078682.png'

export const Form = () => {
  let getLocalStorage = getDataFromLocalStorage('recipe');
  
  const [recipeTitle, setRecipeTitle] = useState('');
  const [recipeDescription, setRecipeDescription] = useState('');
  const [recipes, setRecipes] = useState(getLocalStorage);
  
  useEffect(() => {
    saveDataInLocalStorage(recipes);

  }, [recipes]); // Cuando 'recipes' se actualice, tiene que ejecutar la función saveDataInLocalStorage.

  const handleValueSubmit = (event) => { // OnSubmit
    let newRecipe = {
      id: nanoid(),
      title: recipeTitle, 
      description: recipeDescription
      
    };
    
    event.preventDefault();

    setRecipes([...recipes, newRecipe]); // Mantiene las recetas anteriores, y le agrega una nueva receta.

    /* Vaciamos los valores del formulario. */

    setRecipeTitle(''); 
    setRecipeDescription('');

  };

  return(
  <>
    <div className="container mb-5 d-flex justify-content-center align-items-center" style={{ marginLeft: '95px', marginTop: '100px' }}>
      <div className="row align-items-stretch w-75">
        <div className="col-md-3 m-0 p-0 bg-white d-flex align-items-center justify-content-center shadow">
          <ImageComponent src={formImage} stylesClass={'img-form'} titleForImage='descript-img-form' />
        </div>
        <div className="col-md-9 m-0 p-0">
          <div className="bg-body-tertiary text-center shadow p-5" style={{ height: '500px' }}>
            <div className="d-flex justify-content-center align-items-center">
              <h2 className="text-start"><b>Anotar</b> mi<br />receta</h2>
              <hr className="w-100" />
            </div>
            <form 
              className='mt-5' 
              onSubmit={handleValueSubmit}
            >
              <div className="form-group">
                <input
                  required
                  onChange={event => setRecipeTitle(event.target.value)}
                  value={recipeTitle}
                  type="text" 
                  className="form-control mb-3" 
                  id="recipeTitle" 
                  name="recipeTitle" 
                  placeholder="Nombre de la receta" 
                
                />
                <textarea
                  required 
                  onChange={event => setRecipeDescription(event.target.value)}
                  value={recipeDescription}
                  type="text"
                  className="form-control text-start mb-4" 
                  id="recipeDescription" 
                  name="recipeDescription" 
                  placeholder="Pasos de la receta..." 
                
                />
              </div>
              <div className="container-login-btn d-flex justify-content-center align-items-center">
                <button type="submit" className="btn btn-outline-success w-50 mb-3">Registrar receta</button>
                <a className="text-decoration-none mb-2 ms-4 text-center text-dark redirect-recipes">Ir a mi listado de recetas</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </>  
  
  );

};
