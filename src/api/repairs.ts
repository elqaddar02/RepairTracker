import api from './index';

export const repairAPI = {
  // Public tracking
  trackRepair: (trackingCode: string) =>
    api.get(`/repairs/track/${trackingCode}`),

  // Client APIs
  getClientRepairs: () =>
    api.get('/client/repairs'),

  // Store APIs
  getStoreRepairs: () =>
    api.get('/store/repairs'),
  
  updateRepairStatus: (repairId: string, status: string) =>
    api.patch(`/store/repairs/${repairId}/status`, { status }),

  getStoreClients: () =>
    api.get('/store/clients'),

  // Admin APIs
  getAllRepairs: () =>
    api.get('/admin/repairs'),
  
  getDashboardStats: () =>
    api.get('/admin/dashboard/stats'),
  
  getAllUsers: () =>
    api.get('/admin/users'),
  
  updateUserStatus: (userId: string, status: string) =>
    api.patch(`/admin/users/${userId}/status`, { status }),
  
  reassignRepair: (repairId: string, storeId: string) =>
    api.patch(`/admin/repairs/${repairId}/reassign`, { storeId }),
};