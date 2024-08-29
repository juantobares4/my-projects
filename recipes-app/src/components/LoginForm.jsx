import React from 'react'

import { ImageComponent } from './ImageComponent';

import '../styles/LoginForm.css'

export const LoginForm = ({ isVisible }) => {
  return (
    <div className='d-flex p-4 flex-column'>
      <div className='m-auto mb-4'>
        <h4>Iniciá Sesión</h4>
        <hr />
      </div>
      <form>
        <div className="input-group flex-nowrap mb-3">
          <span className="input-group-text" id="addon-wrapping">@</span>
          <input type="text" className="form-control" placeholder="Nombre de usuario" aria-label="Username" aria-describedby="addon-wrapping" required />
        </div>
        <div className="input-group flex-nowrap mb-3">
          <span className="input-group-text" id="addon-wrapping">
            <ImageComponent 
              src={'public/index/lock.svg'} 
            />
          </span>
          <input type="password" className="form-control" placeholder="Contraseña" aria-label="password" aria-describedby="addon-wrapping" required />
        </div>
        <div className='my-5 d-flex'>
          <button type='submit' className="m-auto btn btn-outline-primary">Iniciar Sesión</button>
          <p className='ms-2 text-center m-auto redirect-register text-dark'>Registrarse</p>
        </div>
      </form>
    </div>
  
  );

};
