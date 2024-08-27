import React from 'react'
import { Link } from 'react-router-dom';

import { ImageComponent } from './ImageComponent';

import NotFound404 from '../assets/3796506.jpg'
import '../styles/PageNotFound.css'

export const PageNotFound = () => {
  return (
    <div className='bg-white flex-column d-flex justify-content-center align-items-center vh-100'>
      <ImageComponent stylesClass={'not-found'} src={NotFound404} />
      <div>
        <Link to={'/'}>
          <button className='btn btn-dark mt-4'>Volver al Inicio</button>
        </Link>
      </div>
    </div>
  
  );

};
