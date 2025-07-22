import React from 'react'
import { useNavigate, Link } from 'react-router-dom';

import { ImageComponent } from './ImageComponent';
import { removeDataFromSessionStorage } from '../utils/sessionstorage';
import { toastSuccess } from '../utils/toast';
import { useStore } from '../context/useStore';

import profileImg from '../assets/person-circle.svg'
import '../styles/Dropdown.css'

export const Dropdown = () => {
  const navigate = useNavigate();
  const { logout } = useStore();

  const logoutUser = () => {
    logout();

    navigate('/');

    toastSuccess('Sesión cerrada con éxito.');

  };

  return (
    <div className="dropdown">
      <a className="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        <ImageComponent src={profileImg} stylesClass={'profile-img'} />
      </a>

      <ul className="dropdown-menu">
        <li><a onClick={logoutUser} className="dropdown-item">Cerrar Sesión</a></li>
      </ul>
    </div>
  
  );

};
