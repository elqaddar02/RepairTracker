import api from './index';

export const storeAPI = {
  // Store CRUD
  createStore: (storeData: any) =>
    api.post('/stores', storeData),

  getStoreById: (id: number) =>
    api.get(`/stores/${id}`),

  getAllStores: () =>
    api.get('/stores'),

  getActiveStores: () =>
    api.get('/stores/active'),

  updateStore: (id: number, storeData: any) =>
    api.put(`/stores/${id}`, storeData),

  deleteStore: (id: number) =>
    api.delete(`/stores/${id}`),
};
