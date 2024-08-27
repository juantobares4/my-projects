import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Form } from './components/Form';
import { Navbar } from './components/Navbar'
import { RecipeDetail } from './components/RecipeDetail';
import { RecipesList } from './components/RecipesList';
import { PageNotFound } from './components/PageNotFound';

import './App.css'

function App(){
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term); 
  
  }; // La App principal me sirve como un intermediario entre NavBar y RecipesList para enviar props de un componente al otro. En esta función, envío el valor del formulario de búsqueda que está en la Navbar al listado de recetas para poder renderizar según lo que quiero buscar.
 
  return(
    <BrowserRouter>
      <Navbar onSearch={handleSearch} />
        <Routes>
          <Route path='/' element={<RecipesList searchTerm={searchTerm} />}/>
          <Route path='/recipeCreate' element={<Form />}/>
          <Route path='/recipeDetail/:id' element={<RecipeDetail />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes> 
    </BrowserRouter>
  
  );

};

export default App