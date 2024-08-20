import React from 'react';

export const Modal = ({ recipe, onClose, styles }) => {
  if (!recipe) return null;

  return (
    <div className={styles} tabIndex="-1" role="dialog" aria-modal="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">{recipe.title}</h1>
            <button onClick={onClose} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <p><b>Detalles de la receta:</b></p>
            <p>{recipe.description}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-secondary" onClick={onClose}>Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  
  );

};
