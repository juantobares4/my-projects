import React, { useEffect, useState } from 'react'
import { nanoid } from 'nanoid';

import { getDataFromLocalStorage, saveDataInLocalStorage } from '../utils/localstorage';
import { ImageComponent } from './ImageComponent';
import { toastError, toastSuccess } from '../utils/toast';

export const LoginRegister = ({ isVisible }) => {
  let usersLocalStorage = getDataFromLocalStorage('user');

  const [users, setUsers] = useState(Array.isArray(usersLocalStorage) ? usersLocalStorage : []);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  useEffect(() => {
    saveDataInLocalStorage('user', users);

  }, [users]);
  
  const userData = (event) => {
    event.preventDefault();

    if(password === passwordRepeat){
      let newUser = {
        id: nanoid(),
        username: username,
        password: password

      };

      setUsers([...users, newUser]);

      toastSuccess('Usuario creado correctamente.');
      
      setUsername('');
      setPassword('');
      setPasswordRepeat('');

    }else{
      toastError('¡Las contraseñas deben coincidir!');

    };

  };

  return(
    <div className='d-flex p-4 flex-column'>
      <div className='m-auto mb-4'>
        <h4>Registrate</h4>
        <hr />
      </div>
      <form
        onSubmit={userData}
      
      >
        <div className="input-group flex-nowrap mb-3">
          <span className="input-group-text" id="addon-wrapping">@</span>
          <input 
            value={username}
            onChange={event => setUsername(event.target.value)}
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
              src={'public/index/lock.svg'} 
            />
          </span>
          <input 
            value={password}
            onChange={event => setPassword(event.target.value)}
            type="password" 
            className="form-control" 
            placeholder="Contraseña" 
            aria-label="password" 
            aria-describedby="addon-wrapping" 
            required 
          
          />
        </div>
        <div className="input-group flex-nowrap mb-3">
          <span className="input-group-text" id="addon-wrapping">
            <ImageComponent 
              src={'public/index/lock.svg'} 
            />
          </span>
          <input
            value={passwordRepeat}
            onChange={event => setPasswordRepeat(event.target.value)} 
            type="password" 
            className="form-control" 
            placeholder="Repetí la contraseña" 
            aria-label="password" 
            aria-describedby="addon-wrapping" 
            required 

          />
        </div>
        <div className='my-5 d-flex'>
          <button type='submit' className="m-auto btn btn-outline-primary">Registrarme</button>
          <p 
            className='ms-2 text-center m-auto redirect-register text-dark'
            onClick={() => isVisible(!isVisible)}
          >
            Iniciar Sesión
          </p>
        </div>
      </form>
    </div>
  );

};
