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
  const validRoutes = ['/', '/recipesList', '/recipeCreate', '/recipeDetail/:id', '/profile/:id'];

  const isValidRoute = validRoutes.some(route => location.pathname === route || location.pathname.startsWith('/recipeDetail') || location.pathname.startsWith('/profile'));

  return(
    <>
      {isValidRoute && location.pathname !== '/' && <Navbar />} 

      <ToastContainer />

      <Routes>
        <Route path='/' element={<StartPage />} />
        <Route path='/recipesList' element={
          <ProtectedRoutes>
            <RecipesList key={location.pathname} /> {/* Forzar remount */}
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
