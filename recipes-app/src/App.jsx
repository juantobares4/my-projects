import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Form } from './components/Form';
import { Navbar } from './components/Navbar'
import { RecipeDetail } from './components/RecipeDetail';
import { RecipesList } from './components/RecipesList';
import { PageNotFound } from './components/PageNotFound';

import './App.css'

function App(){
  return(
    <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path='/' element={<RecipesList />}/>
          <Route path='/recipeCreate' element={<Form />}/>
          <Route path='/recipeDetail/:id' element={<RecipeDetail />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes> 
    </BrowserRouter>
  
  );

};

export default App