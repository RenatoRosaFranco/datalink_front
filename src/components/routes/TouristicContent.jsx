import React, { useState } from 'react';

const TouristicContent = ({ filteredRoutes, expandedRoutes, toggleRoute, onSelectPlace }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRoutesByName = filteredRoutes.filter(route =>
    route.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h4 className='bold'>Rotas Turísticas</h4>
      <div className="input-group">
        <div className="input-group-addon">
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        <input 
          type="text"
          placeholder="Buscar rotas..."
          className="form-control"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <br />
      {filteredRoutesByName.length > 0 ? (
        filteredRoutesByName.map(route => (
          <div key={route.id} style={{ marginBottom: '20px' }}>
            <h4 className='bold' onClick={() => toggleRoute(route.id)} style={{ cursor: 'pointer' }}>
              {route.name}
              <i className={`pull-right fa ${expandedRoutes[route.id] ? 'fa-chevron-up' : 'fa-chevron-down'}`} style={{ marginLeft: '10px' }}></i>  
            </h4>
            <hr/>
            {expandedRoutes[route.id] && (
              <ul>
                {route.places.length > 0 ? (
                  route.places.map(place => (
                    <a href="#" key={place.id} onClick={() => onSelectPlace(place)}>
                      <li>
                        <i className="fa-solid fa-location-dot"></i>
                        &nbsp; {place.name}
                      </li>
                    </a>
                  ))
                ) : (
                  <p>Nenhum local encontrado.</p>
                )}
              </ul>
            )}
          </div>
        ))
      ) : (
        <p className='well text-center'>Nenhuma rota encontrada.</p>
      )}
    </div>
  );
};

export default TouristicContent;