import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';

const ACCESS_TOKEN = 'pk.eyJ1IjoidmxhZG9zaWtpdDAwNCIsImEiOiJjbHkyNjVzM2UxMm94MmtxdjAzNmVpN2J5In0.1d_jciNAK7qY-6MDz2XaFw';

mapboxgl.accessToken = ACCESS_TOKEN;

const MapComponent = ({ onCityClick }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [selectedMarkers, setSelectedMarkers] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [30.5234, 50.4501],
      zoom: 6
    });

    map.current.on('dblclick', () => {
      setSelectedMarkers([]);
      document.querySelectorAll('.marker').forEach(marker => {
        marker.style.backgroundColor = '#53bd25';
      });
      if (map.current.getSource('route')) {
        map.current.removeLayer('route');
        map.current.removeSource('route');
      }
    });

    fetchCities();
  }, []);

  useEffect(() => {
    if (selectedMarkers.length >= 2) {
      fetchDirections(selectedMarkers.slice(-2));
    }
    highlightMarkers(selectedMarkers);
    if (selectedMarkers.length >= 2) {
      zoomToMarkers(selectedMarkers.slice(-2));
    }
  }, [selectedMarkers]);

  const fetchCities = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/cities');
      const cities = response.data;
      setCities(cities);
      addMarkers(cities);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const addMarkers = (cities) => {
    cities.forEach(location => {
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundColor = '#53bd25';
      el.style.borderRadius = '50%';
      el.style.border = '2px solid #FFFFFF';
      el.style.width = '8px';
      el.style.height = '8px';
      el.setAttribute('data-id', location.id);

      el.addEventListener('mouseenter', () => {
        el.style.backgroundColor = '#FFD700';
      });
      el.addEventListener('mouseleave', () => {
        if (!selectedMarkers.includes(location)) {
          el.style.backgroundColor = '#53bd25';
        }
      });
      el.addEventListener('click', () => {
        handleMarkerClick(location);
      });

      new mapboxgl.Marker(el)
        .setLngLat([location.lng, location.lat])
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(location.ukrainian))
        .addTo(map.current);
    });
  };

  const handleMarkerClick = (location) => {
    setSelectedMarkers(prev => {
      if (prev.includes(location)) {
        return prev.filter(marker => marker !== location);
      } else {
        const updatedMarkers = [...prev, location];
        onCityClick(location); // Виклик onCityClick при натисканні на місто
        return updatedMarkers;
      }
    });
  };

  const highlightMarkers = (markers) => {
    document.querySelectorAll('.marker').forEach(marker => {
      marker.style.backgroundColor = '#53bd25';
    });
    markers.slice(-2).forEach(marker => {
      const markerElement = document.querySelector(`.marker[data-id="${marker.id}"]`);
      if (markerElement) {
        markerElement.style.backgroundColor = '#FFD700';
      }
    });
  };

  const zoomToMarkers = (markers) => {
    const bounds = new mapboxgl.LngLatBounds();
    markers.forEach(marker => {
      bounds.extend([marker.lng, marker.lat]);
    });
    map.current.fitBounds(bounds, { padding: 50 });
  };

  const fetchDirections = async (markers) => {
    if (markers.length < 2) return;

    const coordinates = markers.map(marker => `${marker.lng},${marker.lat}`).join(';');
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

    const response = await fetch(url);
    const data = await response.json();

    const route = data.routes[0].geometry;

    if (map.current.getSource('route')) {
      map.current.getSource('route').setData({
        type: 'Feature',
        geometry: route
      });
    } else {
      map.current.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: route
        }
      });

      map.current.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#FFCC00',
          'line-width': 4,
          'line-dasharray': [2, 2]
        }
      });
    }
  };

  return (
    <div ref={mapContainer} style={{ height: "600px", width: "100%" }} />
  );
};

export default MapComponent;
