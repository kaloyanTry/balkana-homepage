'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-gpx';

// Default icon fallback
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png',
});

export default function GpxViewer({ gpxUrl }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!gpxUrl || typeof window === 'undefined') return;

    const container = mapContainerRef.current;
    if (!container || mapInstanceRef.current) return;

    const map = L.map(container);
    mapInstanceRef.current = map;

    setTimeout(() => {
      map.invalidateSize();
      map.setView([42.87, 25.32], 13);
    }, 0);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    // Use green icon for the start marker
    const startIcon = new L.Icon({
      iconUrl: '/leaflet/marker-icon.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowUrl: '/leaflet/marker-shadow.png',
    });

    // Use default red icon for the end marker
    const endIcon = new L.Icon({
      iconUrl: '/leaflet/marker-icon-2x.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowUrl: '/leaflet/marker-shadow.png',
    });

    new L.GPX(gpxUrl, {
      async: true,
      marker_options: {
        startIcon,
        endIcon,
      },
    })
      .on('loaded', function (e) {
        const bounds = e.target?.getBounds();
        if (bounds) {
          setTimeout(() => {
            map.fitBounds(bounds);
          }, 100);
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
      style={{
        height: '500px',
        width: '90%',
        margin: '1rem auto',
      }}
    />
  );
}
