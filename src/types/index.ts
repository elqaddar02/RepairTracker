export interface User {
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  role: 'ADMIN' | 'MANAGER' | 'TECHNICIAN' | 'CUSTOMER';
  status?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  storeId?: number;
  storeName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Repair {
  id: number;
  repairNumber: string;
  customerName: string;
  customerPhone?: string;
  customerEmail?: string;
  deviceType: string;
  deviceModel?: string;
  serialNumber?: string;
  problemDescription: string;
  estimatedCost?: number;
  actualCost?: number;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  storeId: number;
  storeName?: string;
  assignedTechnicianId?: number;
  assignedTechnicianName?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  timeline?: RepairTimeline[];
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
  login: (username: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  role: 'ADMIN' | 'MANAGER' | 'TECHNICIAN' | 'CUSTOMER';
  storeId?: number;
}

export interface Store {
  id: number;
  name: string;
  address: string;
  phoneNumber?: string;
  email?: string;
  managerName?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
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