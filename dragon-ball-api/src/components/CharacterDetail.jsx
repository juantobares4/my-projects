import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { CharactersContext } from '../context/CharactersProvider';
import { filterById } from '../utils/filterById';

import '../styles/CharacterDetail.css';

export const CharacterDetail = () => {
  const [character, setCharacter] = useState([]);
  const { characters } = useContext(CharactersContext);
  const { id } = useParams(); 
  const parseId = parseInt(id); // id es un string, por eso debe ser parseado para poder matchear.
  
  useEffect(() => {
    if(characters.length > 0){
      const foundCharacter = filterById(parseId, characters); 
  
      if(foundCharacter){
        setCharacter(foundCharacter);
      }else{
        setCharacter(null);
        
      };

    };

  }, [characters, parseId]);

  return(
    <div className='detail-container'>
      <div className="card mb-3" style={{ maxWidth: '540px' }}>
        <div className="row g-0">
          <div className="col-md-4 d-flex justify-content-center align-items-center">
            <img src={character.image} className="img-fluid rounded-start card-image" alt={character.name} />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{character.name}</h5>
              <p className="card-text">
                {character.description}
              </p>
              <p className="card-text">
                <small className="text-body-secondary">{character.affiliation}</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  
  );

};
