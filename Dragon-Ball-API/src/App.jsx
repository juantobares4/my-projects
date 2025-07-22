import { Routes, Route, useLocation } from 'react-router-dom';

import { CharacterDetail } from './components/CharacterDetail';
import { CharactersListContainer } from './components/CharactersListContainer';
import { CharactersProvider } from './context/CharactersProvider';
import { NavBar } from './components/NavBar';

import './App.css';

function App(){
  const location = useLocation();
  const validRoutes = ['/', 'characterDetail/:id'];

  const isValidRoute = validRoutes.some(route => location.pathname === route || location.pathname.startsWith('/characterDetail'));

  return (
    <>
      <CharactersProvider>
        {isValidRoute && location.pathname === '/' && <NavBar />} {/* Me renderiza NavBar solamente en CharactersListContainer */}
        <Routes>
          <Route path='/' element={<CharactersListContainer />} />
          <Route path='/characterDetail/:id' element={<CharacterDetail />} />
        </Routes>
      </CharactersProvider>
    </>

  );

};

export default App
