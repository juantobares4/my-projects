import React from 'react'

export const StartPage = () => {
  return (
    <>
      <div className='container-fluid vh-100 d-flex p-0'>
        {/* Contenedor de Formulario */}
        <div className='col-lg-8 bg-white d-flex align-items-center justify-content-center'>
          <p>Formulario de inicio de sesión</p>
        </div>

        {/* Contenedor de Imagen Ilustrativa */}
        <div className='col-lg-4 bg-info d-flex align-items-center justify-content-center'>
          <p>Imagen ilustrativa</p>
        </div>
      </div>
    </>
  
  );

};
