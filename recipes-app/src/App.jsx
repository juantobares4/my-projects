import { useState } from 'react'
import { Navbar } from './components/Navbar'
import './App.css'
import { Form } from './components/Form';
import { RecipesList } from './components/RecipesList';

function App(){
  const [renderOption, setRenderOption] = useState('list');
  
  const handleClick = (option) => {
    setRenderOption(option);

  };

  return(
    <>
      <Navbar onOptionClick={handleClick} />
      
      {renderOption === 'list' ? (
        <RecipesList />

      ) : renderOption === 'register' && ( // Coloco el 'doble ampersand' para no tener que agregar otra condición en caso de que la primera sea 'false'. En definitiva, es como un 'else'.
        <Form />

      )}  
    </>
  
  );

};

export default App