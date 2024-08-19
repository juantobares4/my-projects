/* Importaciones Externas */
import React, { useEffect, useState } from 'react'

/* Importaciones Internas */
import { getDataFromLocalStorage, saveDataInLocalStorage } from '../utils/localstorage';
import { Recipe } from './Recipe';
import { ImageComponent } from './ImageComponent';

/* Estilos Personalizados */
import imgDescriptCard from '../assets/flat-lay-assortment-with-delicious-brazilian-food.jpg'
import recipesLogo from '../assets/recipe_9757071.png'
import '../styles/RecipesList.css'

export const RecipesList = () => {
  let recipesInLocalStorage = getDataFromLocalStorage('recipe');
  const [recipes, setRecipes] = useState(recipesInLocalStorage);

  useEffect(() => {
    saveDataInLocalStorage(recipes);

  }, [recipes]);

  const removeRecipe = (id) => {
    let updatedRecipes = recipes.filter(recipe => recipe.id !== id);
    
    setRecipes(updatedRecipes);

  };

  return(
    <>
      <div className='d-flex justify-content-center align-items-center container-title-of-section'>
        <ImageComponent src={recipesLogo} stylesClass={'img-title'} />
        <div className=''>
          <h2 className="ms-5 text-start"><b>Mi listado</b><br /> de<br />recetas</h2>
        </div>
        <hr className='w-50 ms-5 me-5' />
      </div>
      
      <section className='custom-bg p-5'>
        {
          recipes.length > 0 ? (
            recipes.map(recipe =>
              <Recipe 
                key={recipe.id}
                id={recipe.id}
                styles={'my-5 card d-flex justify-content-center align-items-center flex-column shadow'} 
                name={recipe.title} 
                description={recipe.description} 
                img={imgDescriptCard}
                removeRecipe={removeRecipe}
              
              />
            
            )

          ) : (
            <div className='my-5 d-flex justify-content-center align-items-center'>
              <h5 className='text-start mt-5 lh-5'>
                <b>No hay</b><br /> recetas<br />en tu listado
              </h5>           
            </div>

          )
        
        }
      </section>
    </>
  
  );

};
