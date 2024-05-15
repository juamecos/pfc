// MapDisplay.js
import React from 'react';
import { Marker, Polyline, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import MapBase from './MapBase';
import formatDate from '@/lib/formateDate';

const stoneMarkerIcon = new L.Icon({
    iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Found marker icon
const foundMarkerIcon = new L.Icon({
    iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

export default function MapDisplay({ center, zoom = 1, heightProportion = 0.4, stones }) {
    console.log(stones);
    return (
        <div id="map-section">
            <MapBase center={center} zoom={zoom} heightProportion={heightProportion}>
                {stones.map((stone) => {
                    const sortedFounds = stone.founds.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
                    const polylinePoints = [
                        [stone.latitude, stone.longitude],
                        ...sortedFounds.map(found => [found.latitude, found.longitude])
                    ];

                    return (
                        <React.Fragment key={stone.id}>
                            <Marker
                                position={[stone.latitude, stone.longitude]}
                                icon={stoneMarkerIcon}
                            >
                                <Tooltip>
                                    <b>{stone.title || "No title provided"}</b><br />
                                    Created: {formatDate(stone.created_at)}
                                </Tooltip>
                            </Marker>
                            {stone.founds.map((found) => (
                                <Marker
                                    key={found.id}
                                    position={[found.latitude, found.longitude]}
                                    icon={foundMarkerIcon}
                                >
                                    <Tooltip>
                                        Found Date: {formatDate(found.created_at)}
                                    </Tooltip>
                                </Marker>
                            ))}
                            <Polyline color="red" positions={polylinePoints} />
                        </React.Fragment>
                    );
                })}
            </MapBase>
        </div>
    );
}
