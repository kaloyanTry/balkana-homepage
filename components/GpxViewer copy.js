'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for Leaflet default markers in Next.js
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Simple colored markers using CSS
const orangeIcon = L.divIcon({
  className: 'custom-marker',
  html: '<div style="background: #ff8c00; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

const blueIcon = L.divIcon({
  className: 'custom-marker',
  html: '<div style="background: #1e90ff; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

export default function GpxViewer({ gpxUrl }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!gpxUrl || typeof window === 'undefined') return;

    const container = mapContainerRef.current;
    if (!container || mapInstanceRef.current) return;

    const timeoutId = setTimeout(() => {
      try {
        // Create map
        const map = L.map(container).setView([42.87, 25.32], 13);
        mapInstanceRef.current = map;

        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors',
        }).addTo(map);

        // Fetch and parse GPX manually
        fetch(gpxUrl)
          .then((response) => response.text())
          .then((gpxText) => {
            const parser = new DOMParser();
            const gpxDoc = parser.parseFromString(gpxText, 'application/xml');

            // Get all track points
            const trkpts = gpxDoc.querySelectorAll('trkpt');
            const coordinates = [];

            trkpts.forEach((point) => {
              const lat = parseFloat(point.getAttribute('lat'));
              const lon = parseFloat(point.getAttribute('lon'));
              coordinates.push([lat, lon]);
            });

            if (coordinates.length > 0) {
              // Draw the track line
              const polyline = L.polyline(coordinates, {
                color: '#2563eb',
                weight: 3,
                opacity: 0.8,
              }).addTo(map);

              // Add start marker (blue)
              L.marker(coordinates[0], { icon: blueIcon })
                .bindPopup('Start Point')
                .addTo(map);

              // Add end marker (orange) if different from start
              if (coordinates.length > 1) {
                L.marker(coordinates[coordinates.length - 1], {
                  icon: orangeIcon,
                })
                  .bindPopup('End Point')
                  .addTo(map);
              }

              // Fit map to track bounds
              map.fitBounds(polyline.getBounds(), { padding: [10, 10] });
            }
          })
          .catch((error) => {
            console.error('Error loading GPX:', error);
          });
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch (e) {
          console.error('Cleanup error:', e);
        }
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
        zIndex: 0,
      }}
    />
  );
}
