import React, { useState, memo, useCallback, useMemo } from 'react';
import { Package, Users, Settings, RefreshCw, Plus } from 'lucide-react';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Card, { CardHeader, CardContent } from '../components/ui/Card';
import Table, { TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/Table';
import AppLayout from '../components/layout/AppLayout';

type RepairStatus = 'waiting' | 'in_progress' | 'completed' | 'cancelled';

const fakeRepairs = [
  {
    id: '1',
    trackingCode: 'ABC123',
    clientName: 'John Doe',
    clientId: 'c1',
    deviceBrand: 'Apple',
    deviceModel: 'iPhone 12',
    status: 'waiting' as RepairStatus,
    updatedAt: new Date().toISOString(),
  },
];

const fakeClients = [
  {
    id: 'c1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '1234567890',
    createdAt: new Date().toISOString(),
  },
];

const StoreDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState('repairs');
  const [repairs, setRepairs] = useState(fakeRepairs);
  const [clients, setClients] = useState(fakeClients);

  const [showClientForm, setShowClientForm] = useState(false);
  const [showRepairForm, setShowRepairForm] = useState(false);

  const [newClient, setNewClient] = useState({ name: '', email: '', phone: '' });
  const [newRepair, setNewRepair] = useState({
    trackingCode: '',
    clientId: '',
    deviceBrand: '',
    deviceModel: '',
    status: 'waiting' as RepairStatus,
  });

  const sidebarItems = useMemo(() => [
    { name: 'Repairs', href: '#repairs', icon: Package },
    { name: 'Clients', href: '#clients', icon: Users },
    { name: 'Settings', href: '#settings', icon: Settings },
  ], []);

  const updateRepairStatus = useCallback((repairId: string, status: RepairStatus) => {
    setRepairs(repairs.map(repair =>
      repair.id === repairId
        ? { ...repair, status, updatedAt: new Date().toISOString() }
        : repair
    ));
  }, [repairs]);

  const handleAddClient = () => {
    if (!newClient.name.trim()) return;
    const client = {
      id: `c${Date.now()}`,
      ...newClient,
      createdAt: new Date().toISOString(),
    };
    setClients([...clients, client]);
    setNewClient({ name: '', email: '', phone: '' });
    setShowClientForm(false);
  };

  const handleAddRepair = () => {
    if (!newRepair.trackingCode.trim() || !newRepair.clientId) return;
    const client = clients.find(c => c.id === newRepair.clientId);
    const repair = {
      id: `${Date.now()}`,
      ...newRepair,
      clientName: client ? client.name : 'Inconnu',
      updatedAt: new Date().toISOString(),
    };
    setRepairs([...repairs, repair]);
    setNewRepair({ trackingCode: '', clientId: '', deviceBrand: '', deviceModel: '', status: 'waiting' });
    setShowRepairForm(false);
  };

  return (
    <AppLayout>
      <div className="flex">
        {/* Sidebar */}
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
                        ? 'bg-orange-100 text-orange-700 border border-orange-200'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">
                      {item.name === 'Repairs' ? 'Réparations' :
                       item.name === 'Clients' ? 'Clients' :
                       item.name === 'Settings' ? 'Paramètres' :
                       item.name}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Repairs Section */}
          {activeSection === 'repairs' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Gestion des réparations</h1>
                  <p className="text-gray-600">Gérer et mettre à jour les statuts de réparation</p>
                </div>
                <Button onClick={() => setShowRepairForm(true)} className="flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Ajouter réparation</span>
                </Button>
              </div>

              {showRepairForm && (
                <Card className="mb-6">
                  <CardContent className="space-y-4">
                    <input
                      type="text"
                      placeholder="Code suivi"
                      value={newRepair.trackingCode}
                      onChange={(e) => setNewRepair({ ...newRepair, trackingCode: e.target.value })}
                      className="border p-2 w-full rounded"
                    />
                    <select
                      value={newRepair.clientId}
                      onChange={(e) => setNewRepair({ ...newRepair, clientId: e.target.value })}
                      className="border p-2 w-full rounded"
                    >
                      <option value="">Choisir un client</option>
                      {clients.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      placeholder="Marque appareil"
                      value={newRepair.deviceBrand}
                      onChange={(e) => setNewRepair({ ...newRepair, deviceBrand: e.target.value })}
                      className="border p-2 w-full rounded"
                    />
                    <input
                      type="text"
                      placeholder="Modèle appareil"
                      value={newRepair.deviceModel}
                      onChange={(e) => setNewRepair({ ...newRepair, deviceModel: e.target.value })}
                      className="border p-2 w-full rounded"
                    />
                    <Button onClick={handleAddRepair}>Enregistrer</Button>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold text-gray-900">Réparations actives</h2>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Code</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Appareil</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Mise à jour</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {repairs.map((repair) => (
                        <TableRow key={repair.id}>
                          <TableCell>{repair.trackingCode}</TableCell>
                          <TableCell>{repair.clientName}</TableCell>
                          <TableCell>{repair.deviceBrand} {repair.deviceModel}</TableCell>
                          <TableCell>
                            <Badge variant={repair.status}>{repair.status}</Badge>
                          </TableCell>
                          <TableCell>{new Date(repair.updatedAt).toLocaleDateString('fr-FR')}</TableCell>
                          <TableCell>
                            {repair.status === 'waiting' && (
                              <Button size="sm" onClick={() => updateRepairStatus(repair.id, 'in_progress')}>Démarrer</Button>
                            )}
                            {repair.status === 'in_progress' && (
                              <Button size="sm" variant="secondary" onClick={() => updateRepairStatus(repair.id, 'completed')}>Terminer</Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Clients Section */}
          {activeSection === 'clients' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Gestion des clients</h1>
                  <p className="text-gray-600">Voir et gérer vos clients</p>
                </div>
                <Button onClick={() => setShowClientForm(true)} className="flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Ajouter client</span>
                </Button>
              </div>

              {showClientForm && (
                <Card className="mb-6">
                  <CardContent className="space-y-4">
                    <input
                      type="text"
                      placeholder="Nom complet"
                      value={newClient.name}
                      onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                      className="border p-2 w-full rounded"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={newClient.email}
                      onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                      className="border p-2 w-full rounded"
                    />
                    <input
                      type="text"
                      placeholder="Téléphone"
                      value={newClient.phone}
                      onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                      className="border p-2 w-full rounded"
                    />
                    <Button onClick={handleAddClient}>Enregistrer</Button>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold text-gray-900">Liste des clients</h2>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nom</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Téléphone</TableHead>
                        <TableHead>Réparations</TableHead>
                        <TableHead>Date inscription</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {clients.map((client) => (
                        <TableRow key={client.id}>
                          <TableCell>{client.name}</TableCell>
                          <TableCell>{client.email}</TableCell>
                          <TableCell>{client.phone}</TableCell>
                          <TableCell>{repairs.filter(r => r.clientId === client.id).length}</TableCell>
                          <TableCell>{new Date(client.createdAt).toLocaleDateString('fr-FR')}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default memo(StoreDashboard);
