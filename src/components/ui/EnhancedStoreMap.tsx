import React, { useEffect, useState, memo, useMemo } from 'react';
import { Star, Phone, Clock, Navigation, Search, X, MapPin, Filter, Heart } from 'lucide-react';
import { Store } from '../../data/stores';
import Card, { CardContent } from './Card';
import Button from './Button';
import Badge from './Badge';
import Input from './Input';
import { useClient } from '../../context/ClientContext';

interface EnhancedStoreMapProps {
  stores: Store[];
  userLocation?: { lat: number; lng: number };
  onSelectStore?: (store: Store) => void;
  selectedStore?: Store | null;
  onClosePopup?: () => void;
}

// Moroccan cities for search
const MOROCCAN_CITIES = [
  'Casablanca', 'Rabat', 'Fès', 'Marrakech', 'Agadir', 'Tanger', 'Meknès', 'Oujda',
  'Kénitra', 'Tétouan', 'Safi', 'Mohammedia', 'Khouribga', 'Beni Mellal', 'El Jadida',
  'Taza', 'Nador', 'Settat', 'Larache', 'Ksar El Kebir', 'Skhirat', 'Témara', 'Ouarzazate',
  'Sidi Slimane', 'Errachidia', 'Berrechid', 'Inezgane', 'Khemisset', 'Guelmim', 'Berkane'
];

const EnhancedStoreMap: React.FC<EnhancedStoreMapProps> = ({ 
  stores, 
  userLocation, 
  onSelectStore,
  selectedStore,
  onClosePopup
}) => {
  const { isFavorite, addToFavorites, removeFromFavorites, addNotification } = useClient();
  const [mapCenter, setMapCenter] = useState<[number, number]>([31.6295, -7.9811]); // Marrakech coordinates
  const [userPos, setUserPos] = useState<{ lat: number; lng: number } | null>(userLocation || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    minRating: 0,
    maxDistance: 50,
    services: [] as string[],
    favoritesOnly: false
  });
  const [showStorePopup, setShowStorePopup] = useState(false);

  useEffect(() => {
    if (userLocation) {
      setMapCenter([userLocation.lat, userLocation.lng]);
      setUserPos(userLocation);
    }
  }, [userLocation]);

  // Request user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserPos({ lat: latitude, lng: longitude });
          setMapCenter([latitude, longitude]);
        },
        (error) => {
          console.log('Geolocation error:', error);
        }
      );
    }
  }, []);

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

  // Get all unique services for filtering
  const allServices = useMemo(() => {
    const services = new Set<string>();
    stores.forEach(store => {
      store.services.forEach(service => services.add(service));
    });
    return Array.from(services);
  }, [stores]);

  // Filter stores based on search and filters
  const filteredStores = useMemo(() => {
    let filtered = stores;

    // Filter by search query (store name or city)
    if (searchQuery) {
      filtered = filtered.filter(store => 
        store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.city.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by selected city
    if (selectedCity) {
      filtered = filtered.filter(store => 
        store.city.toLowerCase() === selectedCity.toLowerCase()
      );
    }

    // Filter by rating
    if (filters.minRating > 0) {
      filtered = filtered.filter(store => store.rating >= filters.minRating);
    }

    // Filter by services
    if (filters.services.length > 0) {
      filtered = filtered.filter(store => 
        filters.services.some(service => store.services.includes(service))
      );
    }

    // Filter by favorites
    if (filters.favoritesOnly) {
      filtered = filtered.filter(store => isFavorite(store.id));
    }

    // Add distance and sort
    const storesWithDistance = userPos 
      ? filtered.map(store => ({
          ...store,
          distance: calculateDistance(userPos.lat, userPos.lng, store.latitude, store.longitude)
        })).filter(store => store.distance <= filters.maxDistance)
        .sort((a, b) => a.distance - b.distance)
      : filtered.map(store => ({ ...store, distance: 0 }));

    return storesWithDistance;
  }, [stores, searchQuery, selectedCity, filters, userPos]);

  const handleStoreSelect = (store: Store) => {
    onSelectStore?.(store);
    setShowStorePopup(true);
  };

  const handleClosePopup = () => {
    setShowStorePopup(false);
    onClosePopup?.();
  };

  const toggleServiceFilter = (service: string) => {
    setFilters(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleFavoriteToggle = (store: Store) => {
    if (isFavorite(store.id)) {
      removeFromFavorites(store.id);
      addNotification({
        type: 'system',
        title: 'Magasin retiré des favoris',
        message: `${store.name} a été retiré de vos magasins favoris.`,
      });
    } else {
      addToFavorites(store.id);
      addNotification({
        type: 'system',
        title: 'Magasin ajouté aux favoris',
        message: `${store.name} a été ajouté à vos magasins favoris.`,
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1">
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
          </div>

          {/* City Filter */}
          <div className="md:w-48">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Toutes les villes</option>
              {MOROCCAN_CITIES.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {/* Filter Button */}
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2"
          >
            <Filter className="h-4 w-4" />
            <span>Filtres</span>
          </Button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="border-t pt-4 space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Note minimum: {filters.minRating}
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.5"
                  value={filters.minRating}
                  onChange={(e) => setFilters(prev => ({ ...prev, minRating: parseFloat(e.target.value) }))}
                  className="w-full"
                />
              </div>

              {/* Distance Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Distance max: {filters.maxDistance} km
                </label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={filters.maxDistance}
                  onChange={(e) => setFilters(prev => ({ ...prev, maxDistance: parseInt(e.target.value) }))}
                  className="w-full"
                />
              </div>

              {/* Services Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Services
                </label>
                <div className="max-h-32 overflow-y-auto space-y-1">
                  {allServices.map(service => (
                    <label key={service} className="flex items-center space-x-2 text-sm">
                      <input
                        type="checkbox"
                        checked={filters.services.includes(service)}
                        onChange={() => toggleServiceFilter(service)}
                        className="rounded"
                      />
                      <span>{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Favorites Filter */}
              <div>
                <label className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    checked={filters.favoritesOnly}
                    onChange={(e) => setFilters(prev => ({ ...prev, favoritesOnly: e.target.checked }))}
                    className="rounded"
                  />
                  <span>Afficher seulement les favoris</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Map and Store List */}
      <div className="grid lg:grid-cols-2 gap-6 h-[600px]">
        {/* Store List */}
        <div className="space-y-4 overflow-y-auto">
          <h3 className="text-lg font-semibold text-gray-900 sticky top-0 bg-white py-2">
            {userPos ? 'Magasins à proximité' : 'Tous les magasins'} ({filteredStores.length})
          </h3>
          
          {filteredStores.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Aucun magasin trouvé avec ces critères</p>
            </div>
          ) : (
            filteredStores.map((store) => (
              <Card 
                key={store.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                  selectedStore?.id === store.id ? 'ring-2 ring-orange-500 border-orange-200' : ''
                }`}
              >
                <div onClick={() => handleStoreSelect(store)}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-900">{store.name}</h4>
                      <div className="flex items-center space-x-2">
                        {userPos && (
                          <Badge variant="waiting" className="text-xs">
                            {store.distance?.toFixed(1)} km
                          </Badge>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFavoriteToggle(store);
                          }}
                          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <Heart 
                            className={`h-4 w-4 ${
                              isFavorite(store.id) 
                                ? 'text-red-500 fill-current' 
                                : 'text-gray-400 hover:text-red-500'
                            }`} 
                          />
                        </button>
                      </div>
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
            ))
          )}
        </div>

        {/* Map Placeholder */}
        <div className="bg-gray-100 rounded-lg flex items-center justify-center relative">
          <div className="text-center p-8">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Navigation className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Carte interactive</h3>
            <p className="text-gray-600 mb-4">Fonctionnalité de carte temporairement désactivée</p>
            <p className="text-sm text-gray-500">
              {userPos 
                ? `Votre position: ${userPos.lat.toFixed(4)}, ${userPos.lng.toFixed(4)}`
                : 'Position non disponible'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Store Popup Modal */}
      {showStorePopup && selectedStore && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full max-h-96 overflow-y-auto">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{selectedStore.name}</h2>
                  <p className="text-sm text-gray-500">{selectedStore.address}, {selectedStore.city}</p>
                </div>
                <button
                  onClick={handleClosePopup}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Informations de contact</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span>{selectedStore.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span>{selectedStore.rating} note</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Heures d'ouverture</h3>
                    <div className="space-y-1 text-sm">
                      {Object.entries(selectedStore.workingHours).map(([day, hours]) => (
                        <div key={day} className="flex justify-between">
                          <span className="capitalize text-gray-600">{day}:</span>
                          <span className="text-gray-900">{hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Services offerts</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedStore.services.map((service) => (
                      <Badge key={service} variant="completed" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4 pt-4">
                  <Button className="flex-1">
                    Choisir ce magasin
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={handleClosePopup}
                    className="flex-1"
                  >
                    Fermer
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default memo(EnhancedStoreMap);