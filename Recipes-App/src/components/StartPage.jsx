import React, { useState } from 'react'

import { ImageComponent } from './ImageComponent';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

import '../styles/StartPage.css'

export const StartPage = () => {
  const [renderForm, setRenderForm] = useState(true);
  
  const handleClick = () => {
    setRenderForm(!renderForm);

  };
  
  return (
    <>
      <div className='container-fluid vh-100 d-flex p-0'>
        <div className='d-flex bg-white flex-shrink-0 p-3'>
          <img src="public/favicon.ico" className='me-1' style={{height: '20px'}} />
          <h5 className='font-brand'>NutriChef</h5>
        </div>
        <div className='flex-grow-1 bg-white d-flex align-items-center justify-content-center'>
          {renderForm ? (
              <LoginForm isVisible={handleClick} />

            ) : (
              <RegisterForm isVisible={handleClick} />
          
            )
          
          }
        </div>
        <div className='col-lg-4 d-flex align-items-center justify-content-center'>
          <ImageComponent 
            src={"public/index/assortment-delicious-healthy-food.jpg"} 
            stylesClass={'img-fluid h-100'} 
          />
        </div>
      </div>
    </>
  
  );

};
