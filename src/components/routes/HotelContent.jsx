import React, { useState } from 'react';

const HotelContent = ({ hotels, onSelectPlace }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredHotels = hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h4 className='bold'>Hotéis</h4>
      <div className="input-group">
        <div className="input-group-addon">
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        <input 
          type="text"
          placeholder="Buscar hotéis..."
          className="form-control"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <br />
      {filteredHotels.length > 0 ? (
        filteredHotels.map(hotel => (
          <div key={hotel.id}>
            <a href="#" onClick={() => onSelectPlace(hotel)}>
              <h4>{hotel.name}</h4>
            </a>
          </div>
        ))
      ) : (
        <p className='text-center'>Nenhum hotel encontrado.</p>
      )}
    </div>
  );
};

export default HotelContent;