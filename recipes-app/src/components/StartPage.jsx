import React, { useState } from 'react'

import { ImageComponent } from './ImageComponent';
import { LoginForm } from './LoginForm';
import { LoginRegister } from './LoginRegister';

export const StartPage = () => {
  const [renderForm, setRenderForm] = useState(true);
  
  const handleClick = () => {
    setRenderForm(!renderForm);

  };
  
  return (
    <>
      <div className='container-fluid vh-100 d-flex p-0'>
        <div className='col-lg-8 bg-white d-flex align-items-center justify-content-center'>
          {renderForm ? (
              <LoginForm isVisible={handleClick} />

            ) : (
              <LoginRegister isVisible={handleClick} />
          
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
