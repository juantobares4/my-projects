import React from 'react'
import { Link } from 'react-router-dom';

export const Recipe = ({ styles, id, name, category, img, removeRecipe }) => {
  return (
    <div className={`card ${styles}`} style={{ width: '100%' }}>
      <img src={img} className="card-img-top" alt="Descripción" />
      <div className="card-body">
        <h5 className="my-3 card-title text-start">
          {name} | <b><i>{category}</i></b>
        </h5>
      </div>
      <div className="card-body d-flex justify-content-between">
        <button onClick={() => removeRecipe(id)} className="btn btn-outline-danger me-2">
          Eliminar Receta
        </button>
        <Link to={`/recipeDetail/${id}`} className="btn btn-outline-dark">
          Detalles de la receta
        </Link>
      </div>
    </div>

  );

};
