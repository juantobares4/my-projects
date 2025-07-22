/* External Functions */
import React, { useContext, useEffect } from 'react';

/* Internal Functions */
import { CharactersContext } from '../context/CharactersProvider';

/* Internal Components */
import { CharacterCard } from './CharacterCard';

/* Styles */
import '../styles/CharactersListContainer.css';

export const CharactersListContainer = () => {
  const { characters } = useContext(CharactersContext); 

  return (
    <>
      <div className='main-container'>
        <div className='py-5 section-name'>
          <div className='shadow' style={{backgroundColor: 'rgba(0, 0, 0, 0.587)'}}>
            <h1 className='text-white p-5 custom-font'>Listado completo de personajes</h1>
          </div>
        </div>
        <div className='row container-fluid mt-5'>
          {
            characters.map(character => (
              <div className='col-12 col-sm-6 col-md-4 pb-5' key={character.id}>
                <CharacterCard 
                  key={character.id}
                  styleClass={'my-5 d-flex justify-content-center align-items-center flex-column shadow'}
                  props={character}
                
                />
              </div>
            ))

          }
        </div>
      </div>
    </>
  
  );

};
