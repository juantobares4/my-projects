import React from 'react'

import { ImageComponent } from './ImageComponent';
import { LoginForm } from './LoginForm';

export const StartPage = () => {
  return (
    <>
      <div className='container-fluid vh-100 d-flex p-0'>
        <div className='col-lg-8 bg-white d-flex align-items-center justify-content-center'>
          <LoginForm />
        </div>
        <div className='col-lg-4 bg-info d-flex align-items-center justify-content-center'>
          <ImageComponent 
            src={"public/index/assortment-delicious-healthy-food.jpg"} 
            stylesClass={'img-fluid h-100'} 
          />
        </div>
      </div>
    </>
  
  );

};
