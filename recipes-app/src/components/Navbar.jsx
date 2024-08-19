import React from 'react'

import { ImageComponent } from './ImageComponent'
import { HamburgerMenu } from './HamburgerMenu'

import '../styles/Navbar.css'
import search from '../assets/search.svg'
import hamburgerLogo from '../assets/list.svg'

export const Navbar = ( { onOptionClick } ) => {
  return (
    <header className='container'>
      <nav className="p-4 d-flex justify-content-center align-items-center">
        <HamburgerMenu 
          onOptionClick={onOptionClick} 
          imgButton={hamburgerLogo} 
        />
        <form className="">
          <div className="input-group">
            <span className="input-group-text" id="basic-addon1"> 
              <ImageComponent stylesClass={'img-descrip-nav'} src={search} />
            </span>
            <input type="text" className="form-control me-3" placeholder="Buscar receta..." aria-label="Username" aria-describedby="basic-addon1" />
          </div>
        </form>
      </nav>
    </header>
  );

};
