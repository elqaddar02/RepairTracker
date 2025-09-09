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
    name: 'TechFix Marrakech',
    address: '123 Avenue Mohammed V',
    city: 'Marrakech',
    phone: '+212 5 24 12 34 56',
    email: 'contact@techfixmarrakech.ma',
    latitude: 31.6295,
    longitude: -7.9811,
    rating: 4.8,
    services: ['Réparation téléphone', 'Réparation ordinateur', 'Réparation tablette', 'Récupération données'],
    workingHours: {
      monday: '9:00 - 18:00',
      tuesday: '9:00 - 18:00',
      wednesday: '9:00 - 18:00',
      thursday: '9:00 - 18:00',
      friday: '9:00 - 18:00',
      saturday: '10:00 - 16:00',
      sunday: 'Fermé',
    },
  },
  {
    id: '2',
    name: 'QuickRepair Casablanca',
    address: '456 Boulevard Zerktouni',
    city: 'Casablanca',
    phone: '+212 5 22 98 76 54',
    email: 'info@quickrepair.ma',
    latitude: 33.5731,
    longitude: -7.5898,
    rating: 4.5,
    services: ['Réparation téléphone', 'Remplacement écran', 'Remplacement batterie'],
    workingHours: {
      monday: '8:00 - 19:00',
      tuesday: '8:00 - 19:00',
      wednesday: '8:00 - 19:00',
      thursday: '8:00 - 19:00',
      friday: '8:00 - 19:00',
      saturday: '9:00 - 17:00',
      sunday: '10:00 - 15:00',
    },
  },
  {
    id: '3',
    name: 'Digital Solutions Rabat',
    address: '789 Avenue Allal Ben Abdellah',
    city: 'Rabat',
    phone: '+212 5 37 45 67 89',
    email: 'support@digitalsolutions.ma',
    latitude: 34.0209,
    longitude: -6.8416,
    rating: 4.7,
    services: ['Réparation téléphone', 'Réparation ordinateur', 'Réparation console', 'Réparation smartwatch'],
    workingHours: {
      monday: '9:00 - 20:00',
      tuesday: '9:00 - 20:00',
      wednesday: '9:00 - 20:00',
      thursday: '9:00 - 20:00',
      friday: '9:00 - 20:00',
      saturday: '10:00 - 18:00',
      sunday: 'Fermé',
    },
  },
  {
    id: '4',
    name: 'Mobile Masters Fès',
    address: '321 Rue Talaa Sghira',
    city: 'Fès',
    phone: '+212 5 35 23 45 67',
    email: 'hello@mobilemasters.ma',
    latitude: 34.0331,
    longitude: -5.0003,
    rating: 4.6,
    services: ['Réparation téléphone', 'Réparation tablette', 'Vente accessoires'],
    workingHours: {
      monday: '10:00 - 19:00',
      tuesday: '10:00 - 19:00',
      wednesday: '10:00 - 19:00',
      thursday: '10:00 - 19:00',
      friday: '10:00 - 19:00',
      saturday: '10:00 - 17:00',
      sunday: 'Fermé',
    },
  },
  {
    id: '5',
    name: 'Gadget Clinic Agadir',
    address: '654 Avenue Hassan II',
    city: 'Agadir',
    phone: '+212 5 28 34 56 78',
    email: 'care@gadgetclinic.ma',
    latitude: 30.4278,
    longitude: -9.5981,
    rating: 4.4,
    services: ['Réparation téléphone', 'Réparation ordinateur', 'Dépannage logiciel'],
    workingHours: {
      monday: '9:00 - 18:00',
      tuesday: '9:00 - 18:00',
      wednesday: '9:00 - 18:00',
      thursday: '9:00 - 18:00',
      friday: '9:00 - 18:00',
      saturday: '9:00 - 16:00',
      sunday: 'Fermé',
    },
  },
  {
    id: '6',
    name: 'TechRepair Tanger',
    address: '987 Boulevard Pasteur',
    city: 'Tanger',
    phone: '+212 5 39 12 34 56',
    email: 'info@techrepair.ma',
    latitude: 35.7595,
    longitude: -5.8340,
    rating: 4.3,
    services: ['Réparation téléphone', 'Réparation ordinateur', 'Récupération données', 'Vente pièces'],
    workingHours: {
      monday: '9:00 - 18:30',
      tuesday: '9:00 - 18:30',
      wednesday: '9:00 - 18:30',
      thursday: '9:00 - 18:30',
      friday: '9:00 - 18:30',
      saturday: '9:00 - 16:00',
      sunday: 'Fermé',
    },
  },
  {
    id: '7',
    name: 'PhoneFix Meknès',
    address: '147 Rue de la République',
    city: 'Meknès',
    phone: '+212 5 35 45 67 89',
    email: 'contact@phonefix.ma',
    latitude: 33.8935,
    longitude: -5.5473,
    rating: 4.2,
    services: ['Réparation téléphone', 'Remplacement écran', 'Remplacement batterie', 'Réparation tablette'],
    workingHours: {
      monday: '9:00 - 18:00',
      tuesday: '9:00 - 18:00',
      wednesday: '9:00 - 18:00',
      thursday: '9:00 - 18:00',
      friday: '9:00 - 18:00',
      saturday: '9:00 - 15:00',
      sunday: 'Fermé',
    },
  },
  {
    id: '8',
    name: 'Digital Hub Oujda',
    address: '258 Avenue Mohammed V',
    city: 'Oujda',
    phone: '+212 5 36 56 78 90',
    email: 'support@digitalhub.ma',
    latitude: 34.6814,
    longitude: -1.9086,
    rating: 4.1,
    services: ['Réparation téléphone', 'Réparation ordinateur', 'Dépannage logiciel', 'Formation'],
    workingHours: {
      monday: '9:00 - 18:00',
      tuesday: '9:00 - 18:00',
      wednesday: '9:00 - 18:00',
      thursday: '9:00 - 18:00',
      friday: '9:00 - 18:00',
      saturday: '9:00 - 15:00',
      sunday: 'Fermé',
    },
  },
];