import React, { useEffect, useState } from 'react';
import { repairAPI } from '../api/repairs';
import { Repair } from '../types';
import Navbar from '../components/layout/Navbar';
import Table, { TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/Table';
import Badge from '../components/ui/Badge';
import Card, { CardHeader, CardContent } from '../components/ui/Card';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const ClientDashboard: React.FC = () => {
  const [repairs, setRepairs] = useState<Repair[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRepair, setSelectedRepair] = useState<Repair | null>(null);

  useEffect(() => {
    loadRepairs();
  }, []);

  const loadRepairs = async () => {
    try {
      const response = await repairAPI.getClientRepairs();
      setRepairs(response.data);
    } catch (error) {
      console.error('Failed to load repairs:', error);
    } finally {
      setLoading(false);
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Repairs</h1>
          <p className="text-gray-600">Track and manage your device repairs</p>
        </div>

        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Repair History</h2>
          </CardHeader>
          <CardContent className="p-0">
            {repairs.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <p>No repairs found. Submit your first repair to get started.</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tracking Code</TableHead>
                    <TableHead>Device</TableHead>
                    <TableHead>Store</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {repairs.map((repair) => (
                    <TableRow 
                      key={repair.id} 
                      onClick={() => setSelectedRepair(repair)}
                      className="cursor-pointer"
                    >
                      <TableCell className="font-medium">{repair.trackingCode}</TableCell>
                      <TableCell>{repair.deviceBrand} {repair.deviceModel}</TableCell>
                      <TableCell>{repair.storeName}</TableCell>
                      <TableCell>
                        <Badge variant={repair.status}>
                          {repair.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(repair.createdAt).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
    </div>
  );
};

export default ClientDashboard;