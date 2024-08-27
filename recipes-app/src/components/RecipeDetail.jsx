import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import { getDataFromLocalStorage } from '../utils/localstorage';

import '../styles/RecipeDetail.css'
import imgDescriptCard from '../assets/flat-lay-assortment-with-delicious-brazilian-food.jpg'

export const RecipeDetail = () => {
  let recipes = getDataFromLocalStorage('recipe');
  let { id } = useParams(null); // Tengo que desestructurar el id que recibo de la URL para que sea un str y no un objeto. IMPORTANTE: desestructurarlo con el mismo nombre que lo pase en App.jsx
  let navigate = useNavigate();
  let filterRecipe = recipes.find(recipe => recipe.id === id);
  let arrayRecipe = [filterRecipe];

  return (
    <>
      <div>
        {
          arrayRecipe.map(recipe => (
            <div className='container-detail bg-white row h-100' key={recipe.id}>
              <div className='col-lg-9 d-flex'>
                <img src={imgDescriptCard} className='img-fluid align-self-stretch' alt="" style={{ objectFit: 'cover' }} />
              </div>
              <div className='col-lg-3 mt-5'>
                <div className='detail-title p-4'>
                  <h4 className='text-center'>{recipe.title}</h4>
                  <hr className='w-100' />
                </div>
                <div className='detail-content p-2'>
                  <h5 className='ms-3 py-3'><b>Categoría</b></h5>
                  <p className='ms-3'><i>{recipe.category}</i></p>
                </div>
                <div className='detail-footer p-2'>
                  <h5 className='ms-3 py-3'><b>Descripción</b></h5>
                  <p className='ms-3'>{recipe.description}</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </>
  
  );

};
