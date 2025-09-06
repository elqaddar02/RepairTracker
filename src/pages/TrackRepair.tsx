import React, { useState } from 'react';
import { Search, Package, AlertCircle } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Card, { CardHeader, CardContent } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import StatusTimeline from '../components/ui/StatusTimeline';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import AppLayout from '../components/layout/AppLayout';
import { Repair } from '../types';

const fakeRepairs = [
  {
    trackingCode: 'ABC123',
    deviceType: 'Phone',
    deviceBrand: 'Apple',
    deviceModel: 'iPhone 12',
    issue: 'Screen cracked',
    storeName: 'Store A',
    status: 'completed',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    estimatedCost: 199,
    timeline: [
      { status: 'waiting', description: 'Submitted', timestamp: new Date().toISOString(), completed: true },
      { status: 'in_progress', description: 'Repair started', timestamp: new Date().toISOString(), completed: true },
      { status: 'completed', description: 'Repair completed', timestamp: new Date().toISOString(), completed: true },
    ],
  },
  {
    trackingCode: 'XYZ789',
    deviceType: 'Phone',
    deviceBrand: 'Samsung',
    deviceModel: 'Galaxy S21',
    issue: 'Battery issue',
    storeName: 'Store B',
    status: 'in_progress',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    estimatedCost: 99,
    timeline: [
      { status: 'waiting', description: 'Submitted', timestamp: new Date().toISOString(), completed: true },
      { status: 'in_progress', description: 'Repair started', timestamp: new Date().toISOString(), completed: false },
    ],
  },
  // ...add more if needed...
];

const TrackRepair: React.FC = () => {
  const [trackingCode, setTrackingCode] = useState('');
  const [repair, setRepair] = useState<Repair | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingCode.trim()) return;

    setLoading(true);
    setError('');
    // Simulate lookup
    setTimeout(() => {
      const found = fakeRepairs.find(r => r.trackingCode === trackingCode.trim());
      if (found) {
        setRepair(found as Repair);
        setError('');
      } else {
        setRepair(null);
        setError('Repair not found. Please check your tracking code.');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <Package className="h-16 w-16 text-orange-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Suivre votre réparation</h1>
          <p className="text-gray-600">Entrez votre code de suivi pour voir l'état actuel de votre réparation</p>
        </div>

        <Card className="mb-8">
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Code de suivi"
                placeholder="Entrez votre code de suivi de réparation"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                required
              />
              <Button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    <span>Vérifier le statut</span>
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {error && (
          <Card className="mb-8 border-red-200">
            <CardContent>
              <div className="flex items-center space-x-2 text-red-600">
                <AlertCircle className="h-5 w-5" />
                <span>{error}</span>
              </div>
            </CardContent>
          </Card>
        )}

        {repair && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Détails de la réparation</h2>
                    <p className="text-sm text-gray-500">Code de suivi: {repair.trackingCode}</p>
                  </div>
                  <Badge variant={repair.status}>{repair.status.replace('_', ' ').toUpperCase()}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Informations sur l'appareil</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Type:</span> {repair.deviceType}</p>
                      <p><span className="font-medium">Marque:</span> {repair.deviceBrand}</p>
                      <p><span className="font-medium">Modèle:</span> {repair.deviceModel}</p>
                      <p><span className="font-medium">Problème:</span> {repair.issue}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Informations sur la réparation</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Magasin:</span> {repair.storeName}</p>
                      <p><span className="font-medium">Soumis:</span> {new Date(repair.createdAt).toLocaleDateString()}</p>
                      <p><span className="font-medium">Dernière mise à jour:</span> {new Date(repair.updatedAt).toLocaleDateString()}</p>
                      {repair.estimatedCost && (
                        <p><span className="font-medium">Coût estimé:</span> {repair.estimatedCost}€</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900">Chronologie du statut</h2>
              </CardHeader>
              <CardContent>
                <StatusTimeline
                  currentStatus={repair.status}
                  timeline={repair.timeline?.map((item) => ({
                    status: item.status,
                    description: item.description,
                    timestamp: item.timestamp,
                    completed: item.status === repair.status || item.completed,
                  }))}

                />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default TrackRepair;