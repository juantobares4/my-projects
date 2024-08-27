import React from 'react'
import { Link } from 'react-router-dom';

import '../styles/Recipe.css'

export const Recipe = ({ styles, id, name, description, category, img, removeRecipe }) => {
  return (
    <div className={styles}>
      <div className='p-3 container-title mt-3'>
        <h4 className='text-start'>{name} | <b><i>{category}</i></b></h4>
      </div>
      <hr className='w-100 my-0' />
      <div className='p-5 container-description'>
        <div className='d-flex'>
          <div className='image-container d-flex justify-content-center align-items-center'>
            <img src={img} alt="Descripción" className='recipe-img me-5 mt-4' />
          </div>
          <div className='text-container mt-3'>
            <p className='text-start'><b>Instrucciones de la receta: </b></p>
            <p>{description}</p>
          </div>
        </div>
      </div>
      <hr className='w-100 my-0' />
      <div className='p-4 container-footer-card'>
        <button onClick={() => removeRecipe(id)} className='btn btn-outline-danger me-2'>Eliminar Receta</button>
        <Link to={`/recipeDetail/${id}`}>
          <button className='btn btn-outline-dark'>Detalles de la receta</button>
        </Link>
      </div>
    </div>

  );

};
