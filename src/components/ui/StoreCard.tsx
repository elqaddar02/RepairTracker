import React from 'react';
import { Star, Phone, MapPin, Clock } from 'lucide-react';
import Card, { CardContent } from './Card';
import Badge from './Badge';
import { Store } from '../../data/stores';
import Button from './Button';

interface StoreCardProps {
  store: Store;
  distance?: number;
  onSelect?: (store: Store) => void;
}

const StoreCard: React.FC<StoreCardProps> = ({ store, distance, onSelect }) => {
  const handleClick = () => {
    onSelect?.(store);
  };

  return (
    <div 
      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
        onSelect ? 'hover:scale-105' : ''
      }`}
      onClick={handleClick}
    >
      <Card>
        <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-900">{store.name}</h3>
          {distance !== undefined && (
            <Badge variant="waiting" className="text-xs">
              {distance.toFixed(1)} km
            </Badge>
          )}
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span>{store.address}, {store.city}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Phone className="h-4 w-4 text-gray-400" />
            <span>{store.phone}</span>
          </div>
        </div>

        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span className="text-sm font-medium text-gray-900">{store.rating}</span>
            <span className="text-xs text-gray-500">/5</span>
          </div>
          
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>Aujourd'hui: {store.workingHours.monday}</span>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Services offerts:</h4>
          <div className="flex flex-wrap gap-1">
            {store.services.slice(0, 3).map((service) => (
              <span 
                key={service}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
              >
                {service}
              </span>
            ))}
            {store.services.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                +{store.services.length - 3} autres
              </span>
            )}
          </div>
        </div>

        {onSelect && (
          <Button className="w-full" size="sm">
            Choisir ce magasin
          </Button>
        )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StoreCard;
