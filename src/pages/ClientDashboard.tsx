import React, { useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { Repair } from '../types';
import Navbar from '../components/layout/Navbar';
import Table, { TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/Table';
import Badge, { BadgeProps } from '../components/ui/Badge';
import Card, { CardHeader, CardContent } from '../components/ui/Card';
import AppLayout from '../components/layout/AppLayout';

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
  const [repairs] = useState(fakeRepairs);
  const [selectedRepair, setSelectedRepair] = useState<Repair | null>(null);

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Repairs</h1>
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Track and manage your device repairs</p>
            <Button 
              variant="outline" 
              onClick={() => navigate('/find-stores')}
              className="flex items-center space-x-2"
            >
              <MapPin className="h-4 w-4" />
              <span>Find Stores</span>
            </Button>
          </div>
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
                        <Badge variant={
                          ['waiting', 'in_progress', 'completed', 'cancelled', 'pending', 'approved', 'blocked'].includes(repair.status)
                            ? repair.status as BadgeProps ['variant']
                            : undefined
                        }>
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
    </AppLayout>
  );
};

export default memo(ClientDashboard);