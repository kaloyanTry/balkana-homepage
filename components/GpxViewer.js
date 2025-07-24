'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-gpx';

export default function GpxViewer({ gpxUrl }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  const startIcon = new L.Icon({
    iconUrl: '/icons/pin-green.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    shadowUrl: 'https://unpkg.com/leaflet/dist/images/marker-shadow.png',
    shadowSize: [41, 41],
  });

  const endIcon = new L.Icon({
    iconUrl: '/icons/pin-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    shadowUrl: 'https://unpkg.com/leaflet/dist/images/marker-shadow.png',
    shadowSize: [41, 41],
  });

  useEffect(() => {
    if (!gpxUrl || typeof window === 'undefined') return;

    const container = mapContainerRef.current;

    // Prevent map re-initialization
    if (!container || mapInstanceRef.current) return;

    // Fix: Ensure container has a unique ID (needed by Leaflet internals)
    const map = L.map(container).setView([42.87, 25.32], 13);
    mapInstanceRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    // GPX layer
    const gpx = new L.GPX(gpxUrl, {
      async: true,
      marker_options: {
        // startIconUrl: null,
        // endIconUrl: null,
        startIcon,
        endIcon,
        shadowUrl: null,
      },
    })
      .on('loaded', function (e) {
        try {
          const bounds = e.target?.getBounds();
          if (bounds && map) {
            map.fitBounds(bounds);
          } else {
            console.warn('GPX loaded but no bounds available.');
          }
        } catch (err) {
          console.error('Error during GPX fitBounds:', err);
        }
      })
      .on('error', function (err) {
        console.error('Failed to load GPX file:', err);
      })
      .addTo(map);

    return () => {
      if (map) {
        map.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [gpxUrl]);

  return (
    <div
      ref={mapContainerRef}
      id='map'
      style={{
        height: '500px',
        width: '90%',
        margin: '1rem 0',
      }}
    />
  );
}
