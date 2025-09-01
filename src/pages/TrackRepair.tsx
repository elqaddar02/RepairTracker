import React, { useState } from 'react';
import { Search, Package, AlertCircle } from 'lucide-react';
import { repairAPI } from '../api/repairs';
import { Repair } from '../types';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Card, { CardHeader, CardContent } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import StatusTimeline from '../components/ui/StatusTimeline';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const TrackRepair: React.FC = () => {
  const [trackingCode, setTrackingCode] = useState('');
  const [repair, setRepair] = useState<Repair | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingCode.trim()) return;

    setLoading(true);
    setError('');
    try {
      const response = await repairAPI.trackRepair(trackingCode);
      setRepair(response.data);
    } catch (err) {
      setError('Repair not found. Please check your tracking code.');
      setRepair(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <Package className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Track Your Repair</h1>
          <p className="text-gray-600">Enter your tracking code to see the current status of your repair</p>
        </div>

        <Card className="mb-8">
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Tracking Code"
                placeholder="Enter your repair tracking code"
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
                    <span>Check Status</span>
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
                    <h2 className="text-xl font-semibold text-gray-900">Repair Details</h2>
                    <p className="text-sm text-gray-500">Tracking Code: {repair.trackingCode}</p>
                  </div>
                  <Badge variant={repair.status}>{repair.status.replace('_', ' ').toUpperCase()}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Device Information</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Type:</span> {repair.deviceType}</p>
                      <p><span className="font-medium">Brand:</span> {repair.deviceBrand}</p>
                      <p><span className="font-medium">Model:</span> {repair.deviceModel}</p>
                      <p><span className="font-medium">Issue:</span> {repair.issue}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Repair Information</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Store:</span> {repair.storeName}</p>
                      <p><span className="font-medium">Submitted:</span> {new Date(repair.createdAt).toLocaleDateString()}</p>
                      <p><span className="font-medium">Last Update:</span> {new Date(repair.updatedAt).toLocaleDateString()}</p>
                      {repair.estimatedCost && (
                        <p><span className="font-medium">Estimated Cost:</span> ${repair.estimatedCost}</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900">Status Timeline</h2>
              </CardHeader>
              <CardContent>
                <StatusTimeline currentStatus={repair.status} timeline={repair.timeline} />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackRepair;