/* Importaciones Externas */
import React, { useEffect, useState } from 'react'

/* Importaciones Internas */
import { getDataFromLocalStorage, saveDataInLocalStorage } from '../utils/localstorage';
import { Recipe } from './Recipe';
import { ImageComponent } from './ImageComponent';

/* Estilos Personalizados */
import imgDescriptCard from '../assets/flat-lay-assortment-with-delicious-brazilian-food.jpg'
import recipesLogo from '../assets/recipe_9757071.png'
import search from '../assets/search.svg'
import '../styles/RecipesList.css'
import { filterSearch } from '../utils/filterSearch';
import { useStore } from '../context/useStore';

export const RecipesList = () => {
  const { user } = useStore();
  let recipesInLocalStorage = getDataFromLocalStorage(user.username);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [recipes, setRecipes] = useState(Array.isArray(recipesInLocalStorage) ? recipesInLocalStorage : []); // Tengo que validar lo que recibe ya que sino tengo un error de parseo de datos.
  let filteredResults = filterSearch(searchTerm);

  useEffect(() => {
    saveDataInLocalStorage(user.username, recipes);

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
          <h2 className="ms-5 text-start"><b>Mi libro</b><br /> de<br />recetas</h2>
        </div>
        <hr className='w-50 ms-5 me-5' />
      </div>
      
      <section className='custom-bg p-5'>
      <form
        >
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
                    key={recipe.id}
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
            <div className='d-flex justify-content-center align-items-center' style={{marginBlock: '80px'}}>
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
