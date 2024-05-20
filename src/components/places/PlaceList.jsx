import React, { useEffect, useState } from 'react';
import {QRCodeSVG} from 'qrcode.react';
import { fetchData } from '../../services/api';
import RouteList from '../routes/RouteList';
import PlaceItem from './PlaceItem';

import { GoogleMap, withScriptjs, withGoogleMap, Marker, Polyline, InfoWindow } from 'react-google-maps';

function Map({ places, routes, selectedPlace, setSelectedPlace, openModal }) { // Adicione openModal como um parâmetro
  return (
    <GoogleMap 
      defaultZoom={15}
      defaultCenter={{ lat: -28.66062807612445, lng: -56.00563886919576 }}
      options={{ 
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        zoomControl: false,
        scrollwheel: false
      }}
      style={{ width: '70%', height: '100vh', display: 'inline-block' }}
    >
      {places.map(place => (
        <Marker 
          key={place.id}
          position={{ 
            lat: parseFloat(place.latitude), 
            lng: parseFloat(place.longitude)
          }}
          onClick={() =>  {
            setSelectedPlace(place);
          }}
        />
      ))}

      {selectedPlace && (
        <InfoWindow
          onCloseClick={() => setSelectedPlace(null)}
          position={{
            lat: parseFloat(selectedPlace.latitude),
            lng: parseFloat(selectedPlace.longitude)
          }}
        >
          <PlaceItem place={selectedPlace} openModal={openModal} />
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

const PlaceList = () => {
  const [places, setPlaces] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalPlace, setModalPlace] = useState(null); // State to hold place for modal

  useEffect(() => {
    const getData = async () => {
      try {
        const placesData = await fetchData('places');
        const routesData = await fetchData('routes');
        setPlaces(placesData);
        setRoutes(routesData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    const interval = setInterval(getData, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  }

  const filteredPlaces = places.filter(place =>
    place.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (place) => {
    setModalPlace(place);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error.message}</p>;

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
      <RouteList routes={routes} onSelectPlace={setSelectedPlace} />

      {modalPlace && (
        <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" 
          aria-labelledby="myModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                <h4 className="modal-title bold" id="myModalLabel">{modalPlace.name}</h4>
              </div>
              <div className="modal-body">
                <div className='text-center'>
                  <QRCodeSVG value={modalPlace.url} />
                </div>

                <br />
                <p>
                  <span className='bold'>Endereço:</span><br />
                  {modalPlace.location}
                </p>
                <p>
                  <span className='bold'>Descrição:</span><br />
                  {modalPlace.content}
                </p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{ width: '90%', height: '100vh' }}>
        <div style={{ 
          marginBottom: '20px', 
          width: '20%', 
          position: 'fixed',
          zIndex: '999',
          marginTop: '40px',
          marginLeft: '550px'
        }}>
          <div className='input-group'>
            <div className="input-group-addon">
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <input 
              type="text"
              placeholder="Buscar locais..."
              value={searchTerm}
              onChange={handleSearchChange}
              className='form-control'
            />
          </div>
        </div>

        <WrappedMap
          places={places}
          routes={routes}
          selectedPlace={selectedPlace}
          setSelectedPlace={setSelectedPlace}
          openModal={openModal}
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&
          libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`} 
          loadingElement={<div style={{ height: '100%' }} />}
          containerElement={<div style={{ height: '100%' }} />}
          mapElement={<div style={{ height: '100%' }} />}
        />
      </div>
    </div>
  );
};

export default PlaceList;