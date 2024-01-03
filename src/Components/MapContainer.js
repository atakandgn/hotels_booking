// MapContainer.js
import React from 'react';
import { MapContainer as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const customMarkerIcon = new L.divIcon({
    className: 'custom-marker-icon',
    html: '<i class="fa-solid fa-4x fa-map-marker-alt "></i>',
    iconSize: [60, 60],
    iconAnchor: [24, 48],
    popupAnchor: [0, -48]
});

const MapContainer = ({ center, zoom =14}) => {
    return (
        <LeafletMap center={center} zoom={zoom} style={{ width: '100%', height: '400px' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={center} icon={customMarkerIcon}>
                <Popup>
                    <div style={{ textAlign: 'center' }}>
                        <h3 style={{ margin: '5px 0' }}>Hotel Name</h3>
                        <p>Hotels in this area</p>
                    </div>
                </Popup>
            </Marker>
        </LeafletMap>
    );
};

export default MapContainer;
