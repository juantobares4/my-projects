import React from 'react';
import { Link } from 'react-router-dom';

import { genderTranslate } from '../utils/genderTranslate';

import raceLogo from '../assets/motion-sensor_7525909.png'
import '../styles/CharacterCard.css';

export const CharacterCard = ({ styleClass, props }) => {
  return(
    <div className={`card ${styleClass}`} style={{ width: '100%', backgroundColor: 'aliceblue', transform: 'rotate(-1deg)' }}>
      <p className={`card-header container-fluid ${props.gender === 'Female' ? 'female' : 'male'}`} style={{backgroundColor: 'aliceblue'}}><b>{genderTranslate(props.gender)}</b></p>
      <Link to={`/characterDetail/${props.id}`}>
        <img src={props.image} className="card-img-top card-image effect" alt={props.name} />
      </Link>
      <div className="card-body text-center">
        <h2 className="card-title">{props.name}</h2>
        <div className='d-flex justify-content-center align-items-center mt-4'>
          <img src={raceLogo} alt={props.race} className='logo' />
          <p className="card-text ms-2">{props.race}</p>
        </div>
        <hr />
        <div className='d-flex justify-content-center align-items-center mt-4'>
          <p className="card-text ms-2"><b>Base KI:</b> {props.ki === 'unknown' ? 'Desconocido' : props.ki}</p>
        </div>
        <hr />
        <div>
        <div className='d-flex justify-content-center align-items-center mt-4'>
          <p className="card-text ms-2"><b>Max KI:</b> {props.maxKi === 'unknown' ? 'Desconocido' : props.maxKi}</p>
        </div>
        </div>
      </div>
    </div>
  
  );

};
