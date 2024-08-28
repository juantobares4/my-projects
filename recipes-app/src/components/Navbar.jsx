import React, { useState } from 'react'

import { HamburgerMenu } from './HamburgerMenu'

import '../styles/Navbar.css'
import hamburgerLogo from '../assets/list.svg'

export const Navbar = () => {
  return (
    <header>
      <nav className="p-4 d-flex justify-content-start">
        <HamburgerMenu  
          imgButton={hamburgerLogo} 
        />
      </nav>
    </header>
  );

};
