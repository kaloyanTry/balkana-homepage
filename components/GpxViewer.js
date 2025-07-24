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
  const chartCanvasRef = useRef(null);

  // Function to create elevation chart as PNG
  const createElevationChart = (elevationData) => {
    const canvas = chartCanvasRef.current;
    if (!canvas || elevationData.length === 0) return;

    const ctx = canvas.getContext('2d');
    const width = (canvas.width = 800);
    const height = (canvas.height = 300);

    // Clear canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Calculate chart dimensions
    const padding = 60;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    // Find min/max elevation
    const elevations = elevationData.map((d) => d.elevation);
    const minElevation = Math.min(...elevations);
    const maxElevation = Math.max(...elevations);
    const elevationRange = maxElevation - minElevation;

    // Calculate distance for x-axis
    let totalDistance = 0;
    const distances = [0];
    for (let i = 1; i < elevationData.length; i++) {
      const prev = elevationData[i - 1];
      const curr = elevationData[i];
      const dist =
        Math.sqrt(
          Math.pow(curr.lat - prev.lat, 2) + Math.pow(curr.lon - prev.lon, 2)
        ) * 111000; // Rough conversion to meters
      totalDistance += dist;
      distances.push(totalDistance);
    }

    // Draw grid and axes
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;

    // Vertical grid lines
    for (let i = 0; i <= 10; i++) {
      const x = padding + (i / 10) * chartWidth;
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, padding + chartHeight);
      ctx.stroke();
    }

    // Horizontal grid lines
    for (let i = 0; i <= 10; i++) {
      const y = padding + (i / 10) * chartHeight;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(padding + chartWidth, y);
      ctx.stroke();
    }

    // Draw axes
    ctx.strokeStyle = '#333333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, padding + chartHeight);
    ctx.lineTo(padding + chartWidth, padding + chartHeight);
    ctx.stroke();

    // Draw elevation profile
    ctx.strokeStyle = '#2563eb';
    ctx.fillStyle = 'rgba(37, 99, 235, 0.2)';
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(padding, padding + chartHeight);

    for (let i = 0; i < elevationData.length; i++) {
      const x = padding + (distances[i] / totalDistance) * chartWidth;
      const y =
        padding +
        chartHeight -
        ((elevations[i] - minElevation) / elevationRange) * chartHeight;

      if (i === 0) {
        ctx.lineTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }

    // Fill area under curve
    ctx.lineTo(padding + chartWidth, padding + chartHeight);
    ctx.closePath();
    ctx.fill();

    // Draw line
    ctx.beginPath();
    for (let i = 0; i < elevationData.length; i++) {
      const x = padding + (distances[i] / totalDistance) * chartWidth;
      const y =
        padding +
        chartHeight -
        ((elevations[i] - minElevation) / elevationRange) * chartHeight;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();

    // Add labels
    ctx.fillStyle = '#333333';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';

    // X-axis labels (distance)
    for (let i = 0; i <= 5; i++) {
      const x = padding + (i / 5) * chartWidth;
      const distance = (((totalDistance / 1000) * i) / 5).toFixed(1);
      ctx.fillText(`${distance} km`, x, padding + chartHeight + 20);
    }

    // Y-axis labels (elevation)
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
      const y = padding + chartHeight - (i / 5) * chartHeight;
      const elevation = (minElevation + (elevationRange * i) / 5).toFixed(0);
      ctx.fillText(`${elevation} m`, padding - 10, y + 4);
    }

    // Title
    ctx.textAlign = 'center';
    ctx.font = 'bold 16px Arial';
    ctx.fillText('Elevation Profile', width / 2, 30);

    // Stats
    ctx.font = '12px Arial';
    ctx.textAlign = 'left';
    const stats = [
      `Distance: ${(totalDistance / 1000).toFixed(2)} km`,
      `Min Elevation: ${minElevation.toFixed(0)} m`,
      `Max Elevation: ${maxElevation.toFixed(0)} m`,
      `Elevation Gain: ${elevationRange.toFixed(0)} m`,
    ];

    stats.forEach((stat, index) => {
      ctx.fillText(stat, 10, height - 60 + index * 15);
    });
  };

  // Function to download chart as PNG
  const downloadChart = () => {
    const canvas = chartCanvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'elevation-chart.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

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

            // Get all track points with elevation
            const trkpts = gpxDoc.querySelectorAll('trkpt');
            const coordinates = [];
            const elevationData = [];

            trkpts.forEach((point) => {
              const lat = parseFloat(point.getAttribute('lat'));
              const lon = parseFloat(point.getAttribute('lon'));
              const eleElement = point.querySelector('ele');
              const elevation = eleElement
                ? parseFloat(eleElement.textContent)
                : 0;

              coordinates.push([lat, lon]);
              elevationData.push({ lat, lon, elevation });
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

              // Create elevation chart
              createElevationChart(elevationData);
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
    <div style={{ width: '90%', margin: '1rem auto' }}>
      <div
        ref={mapContainerRef}
        style={{
          height: '500px',
          width: '100%',
          marginBottom: '20px',
          zIndex: 0,
        }}
      />

      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        <button
          onClick={downloadChart}
          style={{
            padding: '10px 20px',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          Download Elevation Chart (PNG)
        </button>
      </div>

      <canvas
        ref={chartCanvasRef}
        style={{
          width: '100%',
          height: 'auto',
          border: '1px solid #ddd',
          borderRadius: '5px',
        }}
      />
    </div>
  );
}
