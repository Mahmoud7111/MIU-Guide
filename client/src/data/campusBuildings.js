/**
 * @fileoverview Mock data for campus buildings and facilities.
 */
export const BUILDINGS = [
  {
    id: 'main-gate',
    name: 'Main Entrance (Gate 1)',
    type: 'Gate',
    coordinates: { x: 50, y: 90 },
    description: 'The primary entry point to MIU campus.',
  },
  {
    id: 'admin-building',
    name: 'Administration Building',
    type: 'Admin',
    coordinates: { x: 50, y: 70 },
    description: 'Housing the registrar, financial office, and university presidency.',
    facilities: ['ATM', 'Information Desk', 'Student Affairs'],
  },
  {
    id: 'faculty-engineering',
    name: 'Engineering Building (E)',
    type: 'Academic',
    coordinates: { x: 20, y: 50 },
    description: 'Home to Engineering and Technology faculties.',
    facilities: ['AI Lab', 'Robotics Workshop', 'Drawing Halls'],
  },
  {
    id: 'faculty-pharmacy',
    name: 'Pharmacy Building (P)',
    type: 'Academic',
    coordinates: { x: 80, y: 50 },
    description: 'Research labs and clinical training facilities for Pharmacy students.',
    facilities: ['Organic Chem Lab', 'Mock Pharmacy'],
  },
  {
    id: 'food-court',
    name: 'Student Food Court',
    type: 'Service',
    coordinates: { x: 50, y: 40 },
    description: 'Main social hub with various international food chains.',
    facilities: ['Starbucks', 'McDonalds', 'Outdoor Seating'],
  },
  {
    id: 'sports-complex',
    name: 'MIU Sports Area',
    type: 'Leisure',
    coordinates: { x: 50, y: 10 },
    description: 'Football courts, basketball area, and the university gym.',
    facilities: ['Football Court', 'Tennis Court', 'Locker Rooms'],
  }
];
