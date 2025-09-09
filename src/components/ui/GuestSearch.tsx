import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Search, MapPin, Navigation } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Card, { CardContent } from './Card';
import Input from './Input';
import StoreCard from './StoreCard';
import { Store } from '../../data/stores';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface GuestSearchProps {
  stores: Store[];
  onSelectStore?: (store: Store) => void;
}


const GuestSearch: React.FC<GuestSearchProps> = ({ stores, onSelectStore }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'pending'>('pending');
  const [mapCenter, setMapCenter] = useState<[number, number]>([31.6295, -7.9811]); // Default to Marrakech

  // Request location permission on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setMapCenter([latitude, longitude]);
          setLocationPermission('granted');
        },
        (error) => {
          console.log('Geolocation error:', error);
          setLocationPermission('denied');
        }
      );
    } else {
      setLocationPermission('denied');
    }
  }, []);

  // Calculate distance between two points
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

  // Filter stores based on search query
  const filteredStores = useMemo(() => {
    if (!searchQuery.trim()) {
      return stores;
    }

    return stores.filter(store => 
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [stores, searchQuery]);

  // Add distance to stores and sort by distance if user location is available
  const storesWithDistance = useMemo(() => {
    if (!userLocation) {
      return filteredStores.map(store => ({ ...store, distance: 0 }));
    }

    return filteredStores
      .map(store => ({
        ...store,
        distance: calculateDistance(
          userLocation.lat, 
          userLocation.lng, 
          store.latitude, 
          store.longitude
        )
      }))
      .sort((a, b) => a.distance - b.distance);
  }, [filteredStores, userLocation]);

  const handleStoreSelect = (store: Store) => {
    onSelectStore?.(store);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <MapPin className="h-8 w-8 text-orange-500" />
          <h1 className="text-3xl font-bold text-gray-900">Trouvez des magasins près de vous</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Recherchez par nom de magasin ou ville, et explorez la carte pour trouver les meilleurs services de réparation.
        </p>
      </div>

      {/* Location Permission Status */}
      {locationPermission === 'pending' && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Navigation className="h-5 w-5 text-blue-500" />
              <p className="text-blue-700">Demande d'autorisation de localisation en cours...</p>
            </div>
          </CardContent>
        </Card>
      )}

      {locationPermission === 'denied' && (
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-yellow-500" />
              <p className="text-yellow-700">
                Localisation non disponible. Vous pouvez toujours rechercher des magasins par nom ou ville.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {locationPermission === 'granted' && userLocation && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Navigation className="h-5 w-5 text-green-500" />
              <p className="text-green-700">
                Localisation activée ! Les magasins sont triés par distance.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Rechercher par nom de magasin ou ville..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Map and Store List */}
      <div className="grid lg:grid-cols-2 gap-6 h-[600px]">
        {/* Store List */}
        <div className="space-y-4 overflow-y-auto">
          <h3 className="text-lg font-semibold text-gray-900 sticky top-0 bg-white py-2">
            {userLocation ? 'Magasins à proximité' : 'Tous les magasins'} ({storesWithDistance.length})
          </h3>
          
          {storesWithDistance.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Aucun magasin trouvé avec ces critères</p>
            </div>
          ) : (
            storesWithDistance.map((store) => (
              <StoreCard
                key={store.id}
                store={store}
                distance={store.distance}
                onSelect={handleStoreSelect}
              />
            ))
          )}
        </div>

        {/* Map */}
        <div className="bg-gray-100 rounded-lg overflow-hidden">
          <MapContainer
            center={mapCenter}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {/* User location marker */}
            {userLocation && (
              <Marker position={[userLocation.lat, userLocation.lng]}>
                <Popup>
                  <div className="text-center">
                    <p className="font-semibold">Votre position</p>
                    <p className="text-sm text-gray-600">
                      {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
                    </p>
                  </div>
                </Popup>
              </Marker>
            )}
            
            {/* Store markers */}
            {storesWithDistance.map((store) => (
              <Marker key={store.id} position={[store.latitude, store.longitude]}>
                <Popup>
                  <div className="text-center min-w-[200px]">
                    <h3 className="font-semibold text-gray-900 mb-2">{store.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{store.address}, {store.city}</p>
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <span className="text-sm font-medium">{store.rating}/5</span>
                      <span className="text-xs text-gray-500">⭐</span>
                    </div>
                    {store.distance > 0 && (
                      <p className="text-xs text-gray-500">
                        {store.distance.toFixed(1)} km de vous
                      </p>
                    )}
                    <div className="mt-2">
                      <button
                        onClick={() => handleStoreSelect(store)}
                        className="px-3 py-1 bg-orange-500 text-white text-xs rounded hover:bg-orange-600 transition-colors"
                      >
                        Choisir ce magasin
                      </button>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default GuestSearch;
