export interface Store {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  latitude: number;
  longitude: number;
  rating: number;
  services: string[];
  workingHours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
}

export const stores: Store[] = [
  {
    id: '1',
    name: 'TechFix Pro',
    address: '123 Main Street',
    city: 'New York',
    phone: '+1 (555) 123-4567',
    email: 'contact@techfixpro.com',
    latitude: 40.7128,
    longitude: -74.0060,
    rating: 4.8,
    services: ['Phone Repair', 'Laptop Repair', 'Tablet Repair', 'Data Recovery'],
    workingHours: {
      monday: '9:00 AM - 6:00 PM',
      tuesday: '9:00 AM - 6:00 PM',
      wednesday: '9:00 AM - 6:00 PM',
      thursday: '9:00 AM - 6:00 PM',
      friday: '9:00 AM - 6:00 PM',
      saturday: '10:00 AM - 4:00 PM',
      sunday: 'Closed',
    },
  },
  {
    id: '2',
    name: 'QuickRepair Center',
    address: '456 Oak Avenue',
    city: 'Brooklyn',
    phone: '+1 (555) 987-6543',
    email: 'info@quickrepair.com',
    latitude: 40.6782,
    longitude: -73.9442,
    rating: 4.5,
    services: ['Phone Repair', 'Screen Replacement', 'Battery Replacement'],
    workingHours: {
      monday: '8:00 AM - 7:00 PM',
      tuesday: '8:00 AM - 7:00 PM',
      wednesday: '8:00 AM - 7:00 PM',
      thursday: '8:00 AM - 7:00 PM',
      friday: '8:00 AM - 7:00 PM',
      saturday: '9:00 AM - 5:00 PM',
      sunday: '10:00 AM - 3:00 PM',
    },
  },
  {
    id: '3',
    name: 'Digital Solutions Hub',
    address: '789 Pine Street',
    city: 'Manhattan',
    phone: '+1 (555) 456-7890',
    email: 'support@digitalhub.com',
    latitude: 40.7589,
    longitude: -73.9851,
    rating: 4.7,
    services: ['Phone Repair', 'Laptop Repair', 'Gaming Console Repair', 'Smart Watch Repair'],
    workingHours: {
      monday: '9:00 AM - 8:00 PM',
      tuesday: '9:00 AM - 8:00 PM',
      wednesday: '9:00 AM - 8:00 PM',
      thursday: '9:00 AM - 8:00 PM',
      friday: '9:00 AM - 8:00 PM',
      saturday: '10:00 AM - 6:00 PM',
      sunday: 'Closed',
    },
  },
  {
    id: '4',
    name: 'Mobile Masters',
    address: '321 Cedar Lane',
    city: 'Queens',
    phone: '+1 (555) 234-5678',
    email: 'hello@mobilemasters.com',
    latitude: 40.7282,
    longitude: -73.7949,
    rating: 4.6,
    services: ['Phone Repair', 'Tablet Repair', 'Accessory Sales'],
    workingHours: {
      monday: '10:00 AM - 7:00 PM',
      tuesday: '10:00 AM - 7:00 PM',
      wednesday: '10:00 AM - 7:00 PM',
      thursday: '10:00 AM - 7:00 PM',
      friday: '10:00 AM - 7:00 PM',
      saturday: '10:00 AM - 5:00 PM',
      sunday: 'Closed',
    },
  },
  {
    id: '5',
    name: 'Gadget Clinic',
    address: '654 Elm Street',
    city: 'Bronx',
    phone: '+1 (555) 345-6789',
    email: 'care@gadgetclinic.com',
    latitude: 40.8448,
    longitude: -73.8648,
    rating: 4.4,
    services: ['Phone Repair', 'Computer Repair', 'Software Troubleshooting'],
    workingHours: {
      monday: '9:00 AM - 6:00 PM',
      tuesday: '9:00 AM - 6:00 PM',
      wednesday: '9:00 AM - 6:00 PM',
      thursday: '9:00 AM - 6:00 PM',
      friday: '9:00 AM - 6:00 PM',
      saturday: '9:00 AM - 4:00 PM',
      sunday: 'Closed',
    },
  },
];