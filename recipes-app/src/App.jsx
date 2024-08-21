import { useState } from 'react'
import { Navbar } from './components/Navbar'
import './App.css'
import { Form } from './components/Form';
import { RecipesList } from './components/RecipesList';

function App(){
  const [renderOption, setRenderOption] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleClick = (option) => {
    setRenderOption(option);

  };

  const handleSearch = (term) => {
    setSearchTerm(term); 
  
  }; // La App principal me sirve como un intermediario entre NavBar y RecipesList para enviar props de un componente al otro. En esta función, envío el valor del formulario de búsqueda que está en la Navbar al listado de recetas para poder renderizar según lo que quiero buscar.
 
  return(
    <>
      <Navbar onOptionClick={handleClick} onSearch={handleSearch} />
      
      {renderOption === 'list' ? (
        <RecipesList searchTerm={searchTerm}  />

      ) : renderOption === 'register' && ( // Coloco el 'doble ampersand' para no tener que agregar otra condición en caso de que la primera sea 'false'. En definitiva, es como un 'else'.
        <Form />

      )}  
    </>
  
  );

};

export default App