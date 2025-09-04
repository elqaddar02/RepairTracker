import React, { useState, memo, useMemo } from 'react';
import { 
  BarChart3, 
  Users, 
  FileText, 
  Settings, 
  Package, 
  TrendingUp,
  Download,
  UserCheck,
  UserX,
  Edit,
  PackageIcon,
  TrendingUpIcon,
  UsersIcon
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Card, { CardHeader, CardContent } from '../components/ui/Card';
import Table, { TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/Table';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import AppLayout from '../components/layout/AppLayout';

const fakeStats = {
  totalRepairs: 120,
  pendingRepairs: 15,
  completedRepairs: 90,
  activeStores: 5,
  activeClients: 20,
  repairsByStatus: [
    { name: 'Pending', value: 15, color: '#F59E42' },
    { name: 'Completed', value: 90, color: '#22C55E' },
    { name: 'In Progress', value: 15, color: '#3B82F6' },
  ],
  repairsByStore: [
    { name: 'Store A', value: 40 },
    { name: 'Store B', value: 30 },
    { name: 'Store C', value: 50 },
  ],
};

const fakeRepairs = [
  {
    id: '1',
    trackingCode: 'ABC123',
    clientName: 'John Doe',
    storeName: 'Store A',
    deviceBrand: 'Apple',
    deviceModel: 'iPhone 12',
    status: 'completed',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    trackingCode: 'XYZ789',
    clientName: 'Jane Smith',
    storeName: 'Store B',
    deviceBrand: 'Samsung',
    deviceModel: 'Galaxy S21',
    status: 'pending',
    createdAt: new Date().toISOString(),
  },
];

const fakeUsers = [
  {
    id: 'u1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'client',
    status: 'approved',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'u2',
    shopName: 'Store A',
    email: 'storea@example.com',
    role: 'store',
    status: 'approved',
    createdAt: new Date().toISOString(),
  },
];

const AdminDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const stats = fakeStats;
  const repairs = fakeRepairs;
  const users = fakeUsers;
  const [userList, setUserList] = useState(users);

  const sidebarItems = [
    { name: 'Dashboard', href: '#dashboard', icon: BarChart3 },
    { name: 'Users', href: '#users', icon: Users },
    { name: 'Repairs', href: '#repairs', icon: Package },
    { name: 'Reports', href: '#reports', icon: FileText },
    { name: 'Settings', href: '#settings', icon: Settings },
  ];

  const updateUserStatus = (userId: string, status: string) => {
    setUserList(userList.map(user =>
      user.id === userId ? { ...user, status } : user
    ));
  };

  const memoizedStats = useMemo(() => stats, []);

  return (
    <AppLayout>
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
                        ? 'bg-orange-100 text-orange-700 border border-orange-200'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">
                      {item.name === 'Dashboard' ? 'Tableau de bord' :
                       item.name === 'Users' ? 'Utilisateurs' :
                       item.name === 'Repairs' ? 'Réparations' :
                       item.name === 'Reports' ? 'Rapports' :
                       item.name === 'Settings' ? 'Paramètres' :
                       item.name}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        <div className="flex-1 p-8">
          {activeSection === 'dashboard' && memoizedStats && (
            <div>
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Tableau de bord administrateur</h1>
                <p className="text-gray-600">Aperçu de l'activité et des performances de la plateforme</p>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total réparations</p>
                        <p className="text-2xl font-bold text-gray-900">{memoizedStats.totalRepairs}</p>
                      </div>
                      <PackageIcon className="h-8 w-8 text-orange-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">En attente</p>
                        <p className="text-2xl font-bold text-gray-900">{memoizedStats.pendingRepairs}</p>
                      </div>
                      <TrendingUpIcon className="h-8 w-8 text-orange-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Terminées</p>
                        <p className="text-2xl font-bold text-gray-900">{memoizedStats.completedRepairs}</p>
                      </div>
                      <Package className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Magasins actifs</p>
                        <p className="text-2xl font-bold text-gray-900">{memoizedStats.activeStores}</p>
                      </div>
                      <UsersIcon className="h-8 w-8 text-orange-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Clients actifs</p>
                        <p className="text-2xl font-bold text-gray-900">{memoizedStats.activeClients}</p>
                      </div>
                      <UsersIcon className="h-8 w-8 text-orange-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Simplified Charts */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-semibold text-gray-900">Réparations par statut</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {memoizedStats.repairsByStatus.map((item) => (
                        <div key={item.name} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: item.color }}
                            />
                            <span className="text-sm font-medium text-gray-700">{item.name}</span>
                          </div>
                          <span className="text-sm font-bold text-gray-900">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-semibold text-gray-900">Réparations par magasin</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {memoizedStats.repairsByStore.map((item) => (
                        <div key={item.name} className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">{item.name}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-orange-500 h-2 rounded-full" 
                                style={{ width: `${(item.value / Math.max(...memoizedStats.repairsByStore.map(s => s.value))) * 100}%` }}
                              />
                            </div>
                            <span className="text-sm font-bold text-gray-900 w-8">{item.value}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeSection === 'users' && (
            <div>
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
                <p className="text-gray-600">Manage clients and stores</p>
              </div>

              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold text-gray-900">All Users</h2>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {userList.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">
                            {user.name || user.shopName || 'N/A'}
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge variant={user.role === 'store' ? 'in_progress' : 'completed'}>
                              {user.role.toUpperCase()}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={user.status === 'approved' ? 'approved' : user.status === 'blocked' ? 'blocked' : 'pending'}>
                              {user.status?.toUpperCase() || 'APPROVED'}
                            </Badge>
                          </TableCell>
                          <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              {user.status !== 'approved' && (
                                <Button
                                  size="sm"
                                  onClick={() => updateUserStatus(user.id, 'approved')}
                                  className="flex items-center space-x-1"
                                >
                                  <UserCheck className="h-3 w-3" />
                                  <span>Approve</span>
                                </Button>
                              )}
                              {user.status !== 'blocked' && (
                                <Button
                                  size="sm"
                                  variant="danger"
                                  onClick={() => updateUserStatus(user.id, 'blocked')}
                                  className="flex items-center space-x-1"
                                >
                                  <UserX className="h-3 w-3" />
                                  <span>Block</span>
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

          {activeSection === 'repairs' && (
            <div>
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Repair Management</h1>
                <p className="text-gray-600">Global view of all repairs across stores</p>
              </div>

              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold text-gray-900">All Repairs</h2>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tracking Code</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Store</TableHead>
                        <TableHead>Device</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {repairs.map((repair) => (
                        <TableRow key={repair.id}>
                          <TableCell className="font-medium">{repair.trackingCode}</TableCell>
                          <TableCell>{repair.clientName}</TableCell>
                          <TableCell>{repair.storeName}</TableCell>
                          <TableCell>{repair.deviceBrand} {repair.deviceModel}</TableCell>
                          <TableCell>
                            <Badge variant={
                              repair.status === 'completed' ? 'completed' :
                              repair.status === 'pending' ? 'pending' :
                              repair.status === 'in_progress' ? 'in_progress' :
                              repair.status === 'cancelled' ? 'cancelled' :
                              repair.status === 'waiting' ? 'waiting' :
                              undefined
                            }>
                              {repair.status.replace('_', ' ').toUpperCase()}
                            </Badge>
                          </TableCell>
                          <TableCell>{new Date(repair.createdAt).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline" className="flex items-center space-x-1">
                              <Edit className="h-3 w-3" />
                              <span>Edit</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === 'reports' && (
            <div>
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
                <p className="text-gray-600">Generate and download reports</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-semibold text-gray-900">Export Data</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Button className="w-full flex items-center justify-center space-x-2">
                        <Download className="h-4 w-4" />
                        <span>Download Repairs CSV</span>
                      </Button>
                      <Button variant="outline" className="w-full flex items-center justify-center space-x-2">
                        <Download className="h-4 w-4" />
                        <span>Download Users PDF</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-semibold text-gray-900">Quick Stats</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span>This Month's Repairs:</span>
                        <span className="font-medium">{repairs.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Active Stores:</span>
                        <span className="font-medium">{users.filter(u => u.role === 'store').length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Clients:</span>
                        <span className="font-medium">{users.filter(u => u.role === 'client').length}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeSection === 'settings' && (
            <div>
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
                <p className="text-gray-600">Manage platform settings and configurations</p>
              </div>

              <Card>
                <CardContent>
                  <div className="text-center py-12">
                    <Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">System settings panel coming soon...</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default memo(AdminDashboard);