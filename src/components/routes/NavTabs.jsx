import React from 'react';

const NavTabs = ({ activeTab, changeTab }) => (
  <ul className="nav nav-tabs">
    <li className="nav-item">
      <a 
        className={`nav-link ${activeTab === 'routes' ? 'active' : ''}`}
        onClick={() => changeTab('routes')}
      >
        Rotas
      </a>
    </li>
    <li className="nav-item">
      <a 
        className={`nav-link ${activeTab === 'restaurants' ? 'active' : ''}`}
        onClick={() => changeTab('restaurants')}
      >
        Restaurantes
      </a>
    </li>
    <li className="nav-item">
      <a 
        className={`nav-link ${activeTab === 'hotels' ? 'active' : ''}`}
        onClick={() => changeTab('hotels')}
      >
        Hotéis
      </a>
    </li>
  </ul>
);

export default NavTabs;