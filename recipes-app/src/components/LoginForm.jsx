import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { getDataFromLocalStorage } from '../utils/localstorage'
import { ImageComponent } from './ImageComponent'
import { getDataFromSessionStorage, saveDataInSessionStorage } from '../utils/sessionstorage';
import { toastError, toastSuccess } from '../utils/toast';
import { useStore } from '../context/useStore';

import '../styles/LoginForm.css'

export const LoginForm = ({ isVisible }) => {
  let usersLocalStorage = getDataFromLocalStorage('user');
  let navigate = useNavigate();

  const [usernameLogin, setUsernameLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
  const [users, setUsers] = useState(Array.isArray(usersLocalStorage) ? usersLocalStorage : []);
  const {login} = useStore();

  const handleLogin = (event) => {
    event.preventDefault();
    
    let auth = users.find(user => user.username === usernameLogin && user.password === passwordLogin);

    if(auth){
      login({id: 1, username: usernameLogin});

      navigate('/recipesList');
      toastSuccess(`Sesión iniciada correctamente.`);

    }else{
      toastError('Datos de usuario incorrectos.');

    };

  };

  return(
    <div className='d-flex p-4 flex-column'>
      <div className='m-auto mb-4'>
        <h4>Iniciá Sesión</h4>
        <hr />
      </div>
      <form
        onSubmit={handleLogin}
      >
        <div className="input-group flex-nowrap mb-3">
          <span className="input-group-text" id="addon-wrapping">@</span>
          <input
            value={usernameLogin}
            onChange={event => setUsernameLogin(event.target.value)} 
            type="text" 
            className="form-control" 
            placeholder="Nombre de usuario" 
            aria-label="Username" 
            aria-describedby="addon-wrapping" 
            required 
          />
        </div>
        <div className="input-group flex-nowrap mb-3">
          <span className="input-group-text" id="addon-wrapping">
            <ImageComponent 
              src={'public/index/key.svg'} 
            />
          </span>
          <input 
            value={passwordLogin}
            onChange={event => setPasswordLogin(event.target.value)}
            type="password" 
            className="form-control" 
            placeholder="Contraseña" 
            aria-label="password" 
            aria-describedby="addon-wrapping" 
            required 
          />
        </div>
        <div className='my-5 d-flex'>
          <button type='submit' className="m-auto btn btn-outline-primary">Iniciar Sesión</button>
          <p 
            className='ms-2 text-center m-auto redirect-register text-dark'
            onClick={() => isVisible(!isVisible)}
          >
            Registrarse
          </p>
        </div>
      </form>
    </div>
  
  );

};
