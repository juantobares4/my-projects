import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Form } from './components/Form';
import { Navbar } from './components/Navbar'
import { PageNotFound } from './components/PageNotFound';
import { RecipeDetail } from './components/RecipeDetail';
import { RecipesList } from './components/RecipesList';
import { StartPage } from './components/StartPage';

import 'react-toastify/dist/ReactToastify.css';
import './App.css'

function App(){
  const location = useLocation();

  return(
    <>
      {location.pathname !== '/' && <Navbar />} {/* El doble ampersand nos evita tener que colocar un else en el renderizado condicional */}

      <ToastContainer />

      <Routes>
        <Route path='/' element={<StartPage />} />
        <Route path='/recipesList' element={<RecipesList />}/>
        <Route path='/recipeCreate' element={<Form />}/>
        <Route path='/recipeDetail/:id' element={<RecipeDetail />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes> 
  
    </>
  
  );

};

export default App