import React, { useState } from 'react';
import './style.css';

const PlaceItem = ({ place, openModal }) => {
  let logo = 'https://via.placeholder.com/150x150';

  return (
    <div className='place-item'>
      <img 
        src={logo} 
        alt={place.name} 
        style={{ width: '100%' }}
      />
      <h4 className='bold'>{place.name}</h4>
      <p>{place.location}</p>
      <p>{place.content}</p>

      <button 
        className='btn btn-primary btn-md'
        data-toggle="modal"
        data-target="#myModal"
        onClick={() => openModal(place)}
      >
        <i className="fa-solid fa-circle-info"></i>
        &nbsp; Detalhes
      </button>

      <button
        style={{ marginLeft: '5px' }}
        className='btn btn-default btn-md'
      >
        <i className="fa-regular fa-heart"></i>
        &nbsp; Favoritar
      </button>
    </div>
  );
};

export default PlaceItem;