import React, { useEffect, useState, memo, useMemo } from 'react';
import { Star, Phone, Clock, Navigation } from 'lucide-react';
import { Store } from '../../data/stores';
import Card, { CardContent } from './Card';
import Button from './Button';
import Badge from './Badge';

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
  const [userPos, setUserPos] = useState<{ lat: number; lng: number } | null>(userLocation || null);

  useEffect(() => {
    if (userLocation) {
      setMapCenter([userLocation.lat, userLocation.lng]);
      setUserPos(userLocation);
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

  // Add a local type for stores with distance
  type StoreWithDistance = Store & { distance: number };

  const storesWithDistance: StoreWithDistance[] = useMemo(() => {
    return userPos 
      ? stores.map(store => ({
          ...store,
          distance: calculateDistance(userPos.lat, userPos.lng, store.latitude, store.longitude)
        })).sort((a, b) => a.distance - b.distance)
      : stores as StoreWithDistance[];
  }, [stores, userPos]);

  return (
    <div className="grid lg:grid-cols-2 gap-6 h-[600px]">
      <div className="space-y-4 overflow-y-auto">
        <h3 className="text-lg font-semibold text-gray-900 sticky top-0 bg-white py-2">
          {userPos ? 'Magasins à proximité' : 'Tous les magasins'}
        </h3>
        
        {storesWithDistance.map((store) => (
          <Card 
            key={store.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedStore?.id === store.id ? 'ring-2 ring-blue-500 border-blue-200' : ''
            }`}
          >
            <div onClick={() => onSelectStore?.(store)}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-900">{store.name}</h4>
                  {userPos && (
                    <Badge variant="waiting" className="text-xs">
                      {store.distance?.toFixed(1)} km
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
                  <span>Aujourd'hui: {store.workingHours.monday}</span>
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
                      +{store.services.length - 2} autres
                    </span>
                  )}
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>

      <div className="bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <NavigationIcon className="h-8 w-8 text-orange-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Carte interactive</h3>
          <p className="text-gray-600">Fonctionnalité de carte temporairement désactivée pour de meilleures performances</p>
        </div>
      </div>
    </div>
  );
};

export default memo(StoreMap);