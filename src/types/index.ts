export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'client' | 'store' | 'admin';
  shopName?: string;
  city?: string;
  address?: string;
  phone?: string;
  status?: 'pending' | 'approved' | 'blocked';
  createdAt: string;
}

export interface Repair {
  id: string;
  trackingCode: string;
  clientId: string;
  clientName: string;
  storeId: string;
  storeName: string;
  deviceType: string;
  deviceBrand: string;
  deviceModel: string;
  issue: string;
  status: 'waiting' | 'in_progress' | 'completed' | 'cancelled';
  estimatedCost?: number;
  finalCost?: number;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  timeline: RepairTimeline[];
}

export interface RepairTimeline {
  id: string;
  status: string;
  description: string;
  timestamp: string;
    completed: boolean; 
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  name?: string;
  phone?: string;
  role: 'client' | 'store';
  shopName?: string;
  city?: string;
  address?: string;
}

export interface DashboardStats {
  totalRepairs: number;
  pendingRepairs: number;
  completedRepairs: number;
  activeStores: number;
  activeClients: number;
  repairsByStatus: { name: string; value: number; color: string }[];
  repairsByStore: { name: string; value: number }[];
}