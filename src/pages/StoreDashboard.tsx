import React, { useEffect, useState } from 'react';
import { repairAPI } from '../api/repairs';
import { Repair, User } from '../types';
import { Package, Users, Settings, RefreshCw } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import Table, { TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/Table';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Card, { CardHeader, CardContent } from '../components/ui/Card';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const StoreDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState('repairs');
  const [repairs, setRepairs] = useState<Repair[]>([]);
  const [clients, setClients] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const sidebarItems = [
    { name: 'Repairs', href: '#repairs', icon: Package },
    { name: 'Clients', href: '#clients', icon: Users },
    { name: 'Settings', href: '#settings', icon: Settings },
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [repairsRes, clientsRes] = await Promise.all([
        repairAPI.getStoreRepairs(),
        repairAPI.getStoreClients(),
      ]);
      setRepairs(repairsRes.data);
      setClients(clientsRes.data);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateRepairStatus = async (repairId: string, status: string) => {
    try {
      await repairAPI.updateRepairStatus(repairId, status);
      setRepairs(repairs.map(repair => 
        repair.id === repairId 
          ? { ...repair, status: status as any, updatedAt: new Date().toISOString() }
          : repair
      ));
    } catch (error) {
      console.error('Failed to update repair status:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <div className="w-64 bg-white shadow-sm border-r">
          <div className="p-6">
            <nav className="space-y-2">
              {sidebarItems.map((item) => {
                const isActive = activeSection === item.name.toLowerCase();
                const Icon = item.icon;
                
                return (
                  <button
                    key={item.name}
                    onClick={() => setActiveSection(item.name.toLowerCase())}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                      isActive
                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        <div className="flex-1 p-8">
          {activeSection === 'repairs' && (
            <div>
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Repair Management</h1>
                <p className="text-gray-600">Manage and update repair statuses</p>
              </div>

              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold text-gray-900">Active Repairs</h2>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Device</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Update</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {repairs.map((repair) => (
                        <TableRow key={repair.id}>
                          <TableCell className="font-medium">{repair.trackingCode}</TableCell>
                          <TableCell>{repair.clientName}</TableCell>
                          <TableCell>{repair.deviceBrand} {repair.deviceModel}</TableCell>
                          <TableCell>
                            <Badge variant={repair.status}>
                              {repair.status.replace('_', ' ').toUpperCase()}
                            </Badge>
                          </TableCell>
                          <TableCell>{new Date(repair.updatedAt).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              {repair.status === 'waiting' && (
                                <Button
                                  size="sm"
                                  onClick={() => updateRepairStatus(repair.id, 'in_progress')}
                                  className="flex items-center space-x-1"
                                >
                                  <RefreshCw className="h-3 w-3" />
                                  <span>Start</span>
                                </Button>
                              )}
                              {repair.status === 'in_progress' && (
                                <Button
                                  size="sm"
                                  variant="secondary"
                                  onClick={() => updateRepairStatus(repair.id, 'completed')}
                                  className="flex items-center space-x-1"
                                >
                                  <RefreshCw className="h-3 w-3" />
                                  <span>Complete</span>
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === 'clients' && (
            <div>
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Client Management</h1>
                <p className="text-gray-600">View and manage your clients</p>
              </div>

              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold text-gray-900">Client List</h2>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Repairs</TableHead>
                        <TableHead>Joined</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {clients.map((client) => (
                        <TableRow key={client.id}>
                          <TableCell className="font-medium">{client.name}</TableCell>
                          <TableCell>{client.email}</TableCell>
                          <TableCell>{client.phone}</TableCell>
                          <TableCell>
                            {repairs.filter(r => r.clientId === client.id).length}
                          </TableCell>
                          <TableCell>{new Date(client.createdAt).toLocaleDateString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === 'settings' && (
            <div>
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Store Settings</h1>
                <p className="text-gray-600">Manage your store preferences</p>
              </div>

              <Card>
                <CardContent>
                  <div className="text-center py-12">
                    <Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Settings panel coming soon...</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreDashboard;