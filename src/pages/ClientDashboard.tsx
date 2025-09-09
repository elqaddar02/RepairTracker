import React, { useState, memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Plus, Search, Filter } from 'lucide-react';
import { Repair } from '../types';
import Navbar from '../components/layout/Navbar';
import Table, { TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/Table';
import Badge, { BadgeProps } from '../components/ui/Badge';
import Card, { CardHeader, CardContent } from '../components/ui/Card';
import AppLayout from '../components/layout/AppLayout';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useClient } from '../context/ClientContext';

const fakeRepairs: Repair[] = [
  {
    id: "1",
    trackingCode: "ABC123",
    deviceBrand: "Apple",
    deviceModel: "iPhone 12",
    deviceType: "Phone",
    issue: "Screen cracked",
    storeName: "Store A",
    storeId: "storeA",
    clientId: "client1",
    clientName: "John Doe",
    status: "completed",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    timeline: [
      {
        id: "timeline1-1",
        status: "waiting",
        description: "Repair requested",
        timestamp: new Date().toISOString(),
        completed: true,
      },
      {
        id: "timeline1-2",
        status: "in_progress",
        description: "Repair in progress",
        timestamp: new Date().toISOString(),
        completed: true,
      },
      {
        id: "timeline1-3",
        status: "completed",
        description: "Repair completed",
        timestamp: new Date().toISOString(),
        completed: true,
      },
    ],
  },
  {
    id: "2",
    trackingCode: "XYZ789",
    deviceBrand: "Samsung",
    deviceModel: "Galaxy S21",
    deviceType: "Phone",
    issue: "Battery issue",
    storeName: "Store B",
    storeId: "storeB",
    clientId: "client2",
    clientName: "Jane Smith",
    status: "waiting", // changed from "pending"
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    timeline: [
      {
        id: "timeline2-1",
        status: "waiting",
        description: "Repair requested",
        timestamp: new Date().toISOString(),
        completed: true,
      },
      {
        id: "timeline2-2",
        status: "waiting", // changed from "pending"
        description: "Awaiting approval",
        timestamp: new Date().toISOString(),
        completed: false,
      },
    ],
  },
];



const ClientDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { addNotification } = useClient();
  const [repairs] = useState(fakeRepairs);
  const [selectedRepair, setSelectedRepair] = useState<Repair | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Simulate repair status updates with notifications
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate random repair updates
      if (Math.random() < 0.1) { // 10% chance every 5 seconds
        const randomRepair = repairs[Math.floor(Math.random() * repairs.length)];
        if (randomRepair && randomRepair.status !== 'completed') {
          addNotification({
            type: 'repair_update',
            title: 'Mise à jour de réparation',
            message: `Votre réparation ${randomRepair.trackingCode} a été mise à jour.`,
            actionUrl: `/track?code=${randomRepair.trackingCode}`,
            read: false
          });
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [repairs, addNotification]);

  // Filter repairs based on search and status
  const filteredRepairs = repairs.filter(repair => {
    const matchesSearch = repair.trackingCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         repair.deviceBrand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         repair.deviceModel.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         repair.storeName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || repair.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Group repairs by store
  const repairsByStore = filteredRepairs.reduce((acc, repair) => {
    const storeName = repair.storeName;
    if (!acc[storeName]) {
      acc[storeName] = [];
    }
    acc[storeName].push(repair);
    return acc;
  }, {} as Record<string, Repair[]>);

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Mes réparations</h1>
              <p className="text-gray-600">Suivez et gérez vos réparations d'appareils</p>
            </div>
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                onClick={() => navigate('/client-flow')}
                className="flex items-center space-x-2"
              >
                <MapPin className="h-4 w-4" />
                <span>Trouver un nouveau magasin</span>
              </Button>
              <Button 
                onClick={() => navigate('/client-flow')}
                className="flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Nouvelle réparation</span>
              </Button>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Rechercher par code de suivi, appareil ou magasin..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div className="md:w-48">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="waiting">En attente</option>
                  <option value="in_progress">En cours</option>
                  <option value="completed">Terminé</option>
                  <option value="cancelled">Annulé</option>
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
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">
                Mes réparations par magasin ({filteredRepairs.length})
              </h2>
              {(searchQuery || statusFilter !== 'all') && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchQuery('');
                    setStatusFilter('all');
                  }}
                >
                  Effacer les filtres
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {filteredRepairs.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                {repairs.length === 0 ? (
                  <div>
                    <p className="mb-4">Aucune réparation trouvée. Soumettez votre première réparation pour commencer.</p>
                    <Button onClick={() => navigate('/client-flow')}>
                      Trouver un magasin
                    </Button>
                  </div>
                ) : (
                  <div>
                    <p className="mb-4">Aucune réparation ne correspond à vos critères de recherche.</p>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setSearchQuery('');
                        setStatusFilter('all');
                      }}
                    >
                      Effacer les filtres
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {Object.entries(repairsByStore).map(([storeName, storeRepairs]) => (
                  <div key={storeName} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                        <MapPin className="h-5 w-5 text-orange-500" />
                        <span>{storeName}</span>
                        <Badge variant="waiting" className="text-xs">
                          {storeRepairs.length} réparation{storeRepairs.length > 1 ? 's' : ''}
                        </Badge>
                      </h3>
                    </div>
                    
                    <div className="space-y-2">
                      {storeRepairs.map((repair) => (
                        <div 
                          key={repair.id}
                          onClick={() => setSelectedRepair(repair)}
                          className="p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-4">
                                <span className="font-medium text-gray-900">{repair.trackingCode}</span>
                                <span className="text-gray-600">{repair.deviceBrand} {repair.deviceModel}</span>
                                <Badge variant={
                                  ['waiting', 'in_progress', 'completed', 'cancelled', 'pending', 'approved', 'blocked'].includes(repair.status)
                                    ? repair.status as BadgeProps ['variant']
                                    : undefined
                                }>
                                  {repair.status.replace('_', ' ').toUpperCase()}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-500 mt-1">
                                {repair.issue} • Créé le {new Date(repair.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                navigate(`/track?code=${repair.trackingCode}`);
                              }}
                            >
                              Suivre
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {selectedRepair && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="max-w-2xl w-full max-h-96 overflow-y-auto">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Repair Details</h2>
                    <p className="text-sm text-gray-500">Tracking: {selectedRepair.trackingCode}</p>
                  </div>
                  <button
                    onClick={() => setSelectedRepair(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Device Information</h3>
                    <div className="text-sm space-y-1">
                      <p><span className="font-medium">Type:</span> {selectedRepair.deviceType}</p>
                      <p><span className="font-medium">Brand:</span> {selectedRepair.deviceBrand}</p>
                      <p><span className="font-medium">Model:</span> {selectedRepair.deviceModel}</p>
                      <p><span className="font-medium">Issue:</span> {selectedRepair.issue}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Store & Status</h3>
                    <div className="text-sm space-y-1">
                      <p><span className="font-medium">Store:</span> {selectedRepair.storeName}</p>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">Status:</span>
                        <Badge variant={selectedRepair.status}>
                          {selectedRepair.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default memo(ClientDashboard);