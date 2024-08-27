import React, { useState } from 'react'

import { ImageComponent } from './ImageComponent'
import { HamburgerMenu } from './HamburgerMenu'

import '../styles/Navbar.css'
import search from '../assets/search.svg'
import hamburgerLogo from '../assets/list.svg'

export const Navbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState(''); // Actualiza el contenido del input y lo envía a la prop onSearch.
  
  const handleSubmit = (event) => {
    event.preventDefault();

    if(onSearch){
      onSearch(searchTerm);
      setSearchTerm('');

    };

  };

  return (
    <header className='container'>
      <nav className="p-4 d-flex justify-content-center align-items-center">
        <HamburgerMenu  
          imgButton={hamburgerLogo} 
        />
        <form
          onSubmit={handleSubmit}

        >
          <div className="input-group">
            <span className="input-group-text" id="basic-addon1"> 
              <ImageComponent stylesClass={'img-descrip-nav'} src={search} />
            </span>
            <input 
              type="text"
              className="form-control me-3" 
              placeholder="Título o Categoría" 
              aria-label="Username" 
              aria-describedby="basic-addon1" 
              value={searchTerm} 
              onChange={event => setSearchTerm(event.target.value)}
            />
          </div>
        </form>
      </nav>
    </header>
  );

};
