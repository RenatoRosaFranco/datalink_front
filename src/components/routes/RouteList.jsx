import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';

import NavTabs from './NavTabs';
import TouristicContent from './TouristicContent';
import RestaurantContent from './RestaurantContent';
import HotelContent from './HotelContent';

const RouteList = ({ routes, onSelectPlace }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRoutes, setExpandedRoutes] = useState({});
  const [activeTab, setActiveTab] = useState('routes');
  const [restaurants, setRestaurants] = useState([]);
  const [hotels, setHotels] = useState([]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleRoute = (routeId) => {
    setExpandedRoutes(prevState => ({
      ...prevState,
      [routeId]: !prevState[routeId]
    }));
  };

  const changeTab = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const restaurantResponse = await axios.get('http://localhost:3000/api/v1/places', {
          params: {
            kind: 'restaurant'
          }
        });
        const restaurantData = restaurantResponse.data;
        setRestaurants(restaurantData);
  
        const hotelResponse = await axios.get('http://localhost:3000/api/v1/places', {
          params: {
            kind: 'hotel'
          }
        });
        const hotelData = hotelResponse.data;
        setHotels(hotelData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  
    const intervalId = setInterval(fetchData, 2000);
  
    return () => clearInterval(intervalId);
  }, []);

  const filteredRoutes = routes.filter(route =>
    route.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='touristic-guide'>
      <h2 className="bold">Roteiros Turisticos</h2>
      <NavTabs activeTab={activeTab} changeTab={changeTab} />

      <div>
        {activeTab === 'routes' && (
          <TouristicContent
            filteredRoutes={filteredRoutes}
            expandedRoutes={expandedRoutes}
            toggleRoute={toggleRoute}
            onSelectPlace={onSelectPlace}
          />
        )}

        {activeTab === 'restaurants' && (
          <RestaurantContent  
            restaurants={restaurants}
            onSelectPlace={onSelectPlace}
          />
        )}

        {activeTab === 'hotels' && (
          <HotelContent
            hotels={hotels}
            onSelectPlace={onSelectPlace}
          />
        )}
      </div>
    </div>
  );
};

export default RouteList;