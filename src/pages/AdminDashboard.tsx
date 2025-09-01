import React, { useEffect, useState } from 'react';
import { repairAPI } from '../api/repairs';
import { Repair, User, DashboardStats } from '../types';
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
  Edit
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Card, { CardHeader, CardContent } from '../components/ui/Card';
import Table, { TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/Table';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AdminDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [repairs, setRepairs] = useState<Repair[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const sidebarItems = [
    { name: 'Dashboard', href: '#dashboard', icon: BarChart3 },
    { name: 'Users', href: '#users', icon: Users },
    { name: 'Repairs', href: '#repairs', icon: Package },
    { name: 'Reports', href: '#reports', icon: FileText },
    { name: 'Settings', href: '#settings', icon: Settings },
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [statsRes, repairsRes, usersRes] = await Promise.all([
        repairAPI.getDashboardStats(),
        repairAPI.getAllRepairs(),
        repairAPI.getAllUsers(),
      ]);
      setStats(statsRes.data);
      setRepairs(repairsRes.data);
      setUsers(usersRes.data);
    } catch (error) {
      console.error('Failed to load admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserStatus = async (userId: string, status: string) => {
    try {
      await repairAPI.updateUserStatus(userId, status);
      setUsers(users.map(user => 
        user.id === userId ? { ...user, status: status as any } : user
      ));
    } catch (error) {
      console.error('Failed to update user status:', error);
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
          {activeSection === 'dashboard' && stats && (
            <div>
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600">Overview of platform activity and performance</p>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Repairs</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.totalRepairs}</p>
                      </div>
                      <Package className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Pending</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.pendingRepairs}</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-orange-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Completed</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.completedRepairs}</p>
                      </div>
                      <Package className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Active Stores</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.activeStores}</p>
                      </div>
                      <Users className="h-8 w-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Active Clients</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.activeClients}</p>
                      </div>
                      <Users className="h-8 w-8 text-indigo-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Charts */}
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-semibold text-gray-900">Repairs by Status</h3>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={stats.repairsByStatus}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {stats.repairsByStatus.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-semibold text-gray-900">Repairs by Store</h3>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={stats.repairsByStore}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#3B82F6" />
                      </BarChart>
                    </ResponsiveContainer>
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
                      {users.map((user) => (
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
                            <Badge variant={repair.status}>
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
    </div>
  );
};

export default AdminDashboard;