import React from 'react'

import { HamburgerMenu } from './HamburgerMenu'

import hamburgerLogo from '../assets/list.svg'
import { Dropdown } from './Dropdown';

export const Navbar = () => {
  return (
    <header>
      <nav className="p-4 d-flex justify-content-start">
        <Dropdown />
        <HamburgerMenu  
          imgButton={hamburgerLogo} 
        />
      </nav>
    </header>
  );

};
