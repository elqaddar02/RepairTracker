import api from './index';

export const repairAPI = {
  // Public tracking
  trackRepair: (trackingCode: string) =>
    api.get(`/repairs/track/${trackingCode}`),

  // Repair CRUD
  createRepair: (repairData: any) =>
    api.post('/repairs', repairData),

  getRepairById: (id: number) =>
    api.get(`/repairs/${id}`),

  getAllRepairs: () =>
    api.get('/repairs'),

  getRepairsByStore: (storeId: number) =>
    api.get(`/repairs/store/${storeId}`),

  getRepairsByTechnician: (technicianId: number) =>
    api.get(`/repairs/technician/${technicianId}`),

  getRepairsByStatus: (status: string) =>
    api.get(`/repairs/status/${status}`),

  updateRepairStatus: (id: number, statusData: any) =>
    api.put(`/repairs/${id}/status`, statusData),

  // Store APIs
  getStoreRepairs: () =>
    api.get('/store/repairs'),
  
  getStoreClients: () =>
    api.get('/store/clients'),

  // Admin APIs
  getDashboardStats: () =>
    api.get('/admin/dashboard/stats'),
  
  getAllUsers: () =>
    api.get('/admin/users'),
  
  updateUserStatus: (userId: string, status: string) =>
    api.patch(`/admin/users/${userId}/status`, { status }),
  
  reassignRepair: (repairId: string, storeId: string) =>
    api.patch(`/admin/repairs/${repairId}/reassign`, { storeId }),
};