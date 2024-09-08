import React from 'react'
import { useNavigate } from 'react-router-dom';

import { getDataFromSessionStorage } from '../utils/sessionstorage';
import { ImageComponent } from './ImageComponent';
import { useStore } from '../context/useStore';

import notFound404 from '../assets/3796506.jpg'
import '../styles/PageNotFound.css'

export const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className='bg-white flex-column d-flex justify-content-center align-items-center vh-100'>
      <ImageComponent stylesClass={'not-found'} src={notFound404} />
      <div>
        <button onClick={() => navigate('/recipesList')} className='btn btn-dark mt-4'>Volver al Inicio</button>
      </div>
    </div>
  
  );

};
