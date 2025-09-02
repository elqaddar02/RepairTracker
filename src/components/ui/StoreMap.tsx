import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Star, Phone, Clock, Navigation } from 'lucide-react';
import { Store } from '../../data/stores';
import Card, { CardContent } from './Card';
import Button from './Button';
import Badge from './Badge';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

interface StoreMapProps {
  stores: Store[];
  userLocation?: { lat: number; lng: number };
  onSelectStore?: (store: Store) => void;
  selectedStore?: Store | null;
}

const StoreMap: React.FC<StoreMapProps> = ({ 
  stores, 
  userLocation, 
  onSelectStore,
  selectedStore 
}) => {
  const [mapCenter, setMapCenter] = useState<[number, number]>([40.7128, -74.0060]);
  const [userPos, setUserPos] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (userLocation) {
      setMapCenter([userLocation.lat, userLocation.lng]);
      setUserPos(userLocation);
    } else {
      // Try to get user's location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setMapCenter([latitude, longitude]);
            setUserPos({ lat: latitude, lng: longitude });
          },
          () => {
            // Default to NYC if geolocation fails
            setMapCenter([40.7128, -74.0060]);
          }
        );
      }
    }
  }, [userLocation]);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const storesWithDistance = userPos 
    ? stores.map(store => ({
        ...store,
        distance: calculateDistance(userPos.lat, userPos.lng, store.latitude, store.longitude)
      })).sort((a, b) => a.distance - b.distance)
    : stores;

  const userIcon = new L.Icon({
    iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiIGZpbGw9IiMzQjgyRjYiLz4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iNCIgZmlsbD0id2hpdGUiLz4KPC9zdmc+',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });

  return (
    <div className="grid lg:grid-cols-3 gap-6 h-[600px]">
      <div className="lg:col-span-2">
        <MapContainer
          center={mapCenter}
          zoom={12}
          className="h-full w-full rounded-lg border border-gray-200"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {userPos && (
            <Marker position={[userPos.lat, userPos.lng]} icon={userIcon}>
              <Popup>
                <div className="text-center">
                  <p className="font-medium">Your Location</p>
                </div>
              </Popup>
            </Marker>
          )}

          {stores.map((store) => (
            <Marker
              key={store.id}
              position={[store.latitude, store.longitude]}
              eventHandlers={{
                click: () => onSelectStore?.(store),
              }}
            >
              <Popup>
                <div className="min-w-[200px]">
                  <h3 className="font-semibold text-gray-900 mb-1">{store.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{store.address}, {store.city}</p>
                  <div className="flex items-center space-x-1 mb-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{store.rating}</span>
                  </div>
                  <Button 
                    size="sm" 
                    className="w-full"
                    onClick={() => onSelectStore?.(store)}
                  >
                    Select Store
                  </Button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="space-y-4 overflow-y-auto">
        <h3 className="text-lg font-semibold text-gray-900 sticky top-0 bg-white py-2">
          {userPos ? 'Nearby Stores' : 'All Stores'}
        </h3>
        
        {storesWithDistance.map((store) => (
          <Card 
            key={store.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedStore?.id === store.id ? 'ring-2 ring-blue-500 border-blue-200' : ''
            }`}
            onClick={() => onSelectStore?.(store)}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-gray-900">{store.name}</h4>
                {userPos && (
                  <Badge variant="waiting" className="text-xs">
                    {store.distance.toFixed(1)} km
                  </Badge>
                )}
              </div>
              
              <p className="text-sm text-gray-600 mb-2">{store.address}, {store.city}</p>
              
              <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                  <span>{store.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Phone className="h-3 w-3" />
                  <span>{store.phone}</span>
                </div>
              </div>

              <div className="flex items-center space-x-1 text-xs text-gray-500 mb-3">
                <Clock className="h-3 w-3" />
                <span>Today: {store.workingHours.monday}</span>
              </div>

              <div className="flex flex-wrap gap-1">
                {store.services.slice(0, 2).map((service) => (
                  <span 
                    key={service}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                  >
                    {service}
                  </span>
                ))}
                {store.services.length > 2 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    +{store.services.length - 2} more
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StoreMap;