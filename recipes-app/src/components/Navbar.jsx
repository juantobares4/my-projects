import React from 'react'

import { Dropdown } from './Dropdown';
import { HamburgerMenu } from './HamburgerMenu'
import { useStore } from '../context/useStore';

import hamburgerLogo from '../assets/list.svg'

export const Navbar = () => {
  const { user } = useStore();

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
