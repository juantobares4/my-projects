import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import { ImageComponent } from './ImageComponent';

import '../styles/HamburgerMenu.css'

export const HamburgerMenu = ({ imgButton } ) => {
  return (
    <>
      <button
        className='btn me-2'
        data-bs-toggle="offcanvas"
        data-bs-target="#Id1"
        aria-controls="Id1"
      >
        <ImageComponent stylesClass={'hamburger-menu-img'} src={imgButton} />
      </button>
      
      <div
        className="offcanvas offcanvas-top"
        data-bs-scroll="true"
        tabIndex="-1"
        id="Id1"
        aria-labelledby="Enable both scrolling & backdrop"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title title-hamburger-menu" id="Enable both scrolling & backdrop">
            <b>Bienvenido a NutriChef</b>
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="gap-3 bg-body-tertiary offcanvas-body">
          <p className='p-1'>
            <Link className='text-decoration-none text-dark' to={'/recipesList'}>
              Mis Recetas
            </Link>
          </p>
          <p className='p-1'>
          <Link className='text-decoration-none text-dark' to={'/recipeCreate'}>
              Registrar Receta
            </Link>
          </p>
          <hr />
          <p className='my-0 ms-1'>
            <a 
              href="https://www.recetasgratis.net/" 
              target='__blank' 
              className='text-decoration-none text-primary'
            >
              Más información: Recetas Online
            </a>
          </p>
        </div>
      </div>      
    </>
  
  );

};
