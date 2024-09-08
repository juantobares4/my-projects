import React from 'react'
import { ImageComponent } from './ImageComponent';

import profileImg from '../assets/person-circle.svg'
import '../styles/Dropdown.css'

export const Dropdown = () => {
  return (
    <div className="dropdown">
      <a className="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        <ImageComponent src={profileImg} stylesClass={'profile-img'} />
      </a>

      <ul className="dropdown-menu">
      <li><a className="dropdown-item" href="#">Mi Perfil</a></li>
      <li><hr className="dropdown-divider" /></li>
      <li><a className="dropdown-item" href="#">Cerrar Sesión</a></li>
      </ul>
    </div>
  
  );

};
