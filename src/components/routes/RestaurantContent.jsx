import React, { useState } from 'react';

const RestaurantContent = ({ restaurants, onSelectPlace }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h4 className='bold'>Restaurantes</h4>
      <div className="input-group">
        <div className="input-group-addon">
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        <input 
          type="text"
          placeholder="Buscar restaurantes..."
          className="form-control"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <br />
      {filteredRestaurants.length > 0 ? (
        filteredRestaurants.map(restaurant => (
          <div key={restaurant.id}>
            <a href="#" onClick={() => onSelectPlace(restaurant)}>
              <h4>{restaurant.name}</h4>
            </a>
          </div>
        ))
      ) : (
        <p className='text-center'>Nenhum restaurante encontrado.</p>
      )}
    </div>
  );
};

export default RestaurantContent;