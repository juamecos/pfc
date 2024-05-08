// MapDisplay.js
import React from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';
import MapBase from './MapBase';

const stoneMarkerIcon = new L.Icon({
    iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

export default function MapDisplay({ center, zoom = 1, stones }) {
    return (
        <MapBase center={center} zoom={zoom}>
            {stones.map((stone) => (
                <Marker
                    key={stone.id}
                    position={[stone.latitude, stone.longitude]}
                    icon={stoneMarkerIcon}
                />
            ))}
        </MapBase>
    );
}
