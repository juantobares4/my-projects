import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Form } from './components/Form';
import { Navbar } from './components/Navbar'
import { PageNotFound } from './components/PageNotFound';
import { ProtectedRoutes } from './utils/ProtectedRoutes';
import { RecipeDetail } from './components/RecipeDetail';
import { RecipesList } from './components/RecipesList';
import { StartPage } from './components/StartPage';

import 'react-toastify/dist/ReactToastify.css';
import './App.css'

function App(){
  const location = useLocation();
  const validRoutes = ['/', '/recipesList', '/recipeCreate', '/recipeDetail/:id'];

  const isValidRoute = validRoutes.some(route => location.pathname === route || location.pathname.startsWith('/recipeDetail')); // location.pathname es la ubicación actual del usuario en las rutas.

  return(
    <>
      {isValidRoute && location.pathname !== '/' && <Navbar />} {/* No renderiza la Navbar en la ruta '/' (Login) */}

      <ToastContainer />

      <Routes>
        <Route path='/' element={<StartPage />} />
        <Route path='/recipesList' element={
          <ProtectedRoutes>
            <RecipesList />
          </ProtectedRoutes> 
        }/>
        <Route path='/recipeCreate' element={
          <ProtectedRoutes>
            <Form />
          </ProtectedRoutes>
        }/>
        <Route path='/recipeDetail/:id' element={
          <ProtectedRoutes>
            <RecipeDetail />
          </ProtectedRoutes>
        } />
        <Route path='*' element={<PageNotFound />} />
      </Routes> 
  
    </>
  
  );

};

export default App