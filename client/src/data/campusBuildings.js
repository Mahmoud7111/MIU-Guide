/**
 * @fileoverview Campus data — buildings, restaurants, facilities, events.
 */

export const buildings = [
  {
    id: 'main',
    name: 'Main Building',
    code: 'M',
    slug: 'main-building',
    image: '/images/main-building.jpg',
    description: 'The central academic hub of MIU campus.',
    cameraOrbit: '0deg 72deg 60%',
    fieldOfView: '28deg',
    floors: [
      {
        floor: 0,
        label: 'Ground Floor',
        departments: [
          'Student Support Office',
          'Academic Advising Center',
          'Quality Assurance Center',
          'IT Support',
        ],
      },
      {
        floor: 1,
        label: 'First Floor',
        departments: ['Faculty of Architecture', 'Faculty of Engineering'],
      },
      {
        floor: 2,
        label: 'Second Floor',
        departments: ['Faculty of Mass Communication', 'Faculty of Alsun', 'Student Hub', 'Digital Library'],
      },
      {
        floor: 3,
        label: 'Third Floor',
        departments: [
          'Faculty of Computer Science',
          'Faculty of Electronics & Communications Engineering',
          'Student Hub',
          'Physical Library',
        ],
      },
    ],
  },
  {
    id: 'pharmacy',
    name: 'Pharmacy Building',
    code: 'PH',
    slug: 'pharmacy-building',
    image: '/images/pharmacy-building.jpg',
    description: 'Home of the Faculty of Pharmacy.',
    cameraOrbit: '120deg 72deg 60%',
    fieldOfView: '28deg',
    floors: [
      { floor: 1, label: 'First Floor', departments: ['Faculty of Pharmacy'] },
    ],
  },
  {
    id: 'dental',
    name: 'Oral & Dental Medicine Building',
    code: 'D',
    slug: 'dental-building',
    image: '/images/dental-building.jpg',
    description: 'Home of the Faculty of Oral & Dental Medicine.',
    cameraOrbit: '240deg 72deg 60%',
    fieldOfView: '28deg',
    floors: [
      { floor: 1, label: 'First Floor', departments: ['Faculty of Oral & Dental Medicine'] },
    ],
  },
  {
    id: 'art-facilities',
    name: 'Art Facilities Complex',
    slug: 'art-facilities',
    image: '/images/main-building.jpg',
    description: 'A dedicated space for creative arts, music, and performance.',
    cameraOrbit: '90deg 70deg 60%',
    fieldOfView: '28deg',
    floors: [
      { floor: 1, label: 'First Floor', departments: ['Theater', 'Concert Hall', 'Outdoor Art Space'] },
      { floor: 2, label: 'Second Floor', departments: ['Art Studio', 'Campus Art Exhibition Space'] },
      { floor: 3, label: 'Third Floor', departments: ['Recording Studio', 'Music Room'] },
    ],
  },
  {
    id: 'sports-complex',
    name: 'Sports Complex',
    slug: 'sports-complex',
    image: '/images/sports-complex.jpg',
    description: 'Premier sports and fitness facilities at MIU.',
    cameraOrbit: '135deg 72deg 65%',
    fieldOfView: '28deg',
    floors: [
      {
        floor: 0,
        label: 'Outdoor Areas',
        departments: ['Football Court', 'Basketball Court', 'Handball Court'],
      },
      {
        floor: 1,
        label: 'Indoor Facilities',
        departments: ['MIU Gym', 'Locker Rooms', 'Sports Office'],
      },
    ],
  },
];

export const restaurants = [
  {
    id: 'main-cafeteria',
    name: 'Main Cafeteria',
    location: 'Food Court Area',
    cuisine: 'Egyptian & International',
    hours: '8:00 AM – 6:00 PM',
    image: '/images/cafeteria.jpg',
    cameraOrbit: '45deg 70deg 50%',
    fieldOfView: '28deg',
    menu: [
      {
        category: 'My Corner (Egyptian breakfast)',
        items: [
          { name: 'Foul & Falafel Meal', price: 30 },
          { name: 'Omelet Plate', price: 45 },
        ],
      },
      {
        category: 'Manousha (sandwiches)',
        items: [
          { name: 'Zaatar Manousha', price: 20 },
          { name: 'Cheese Manousha', price: 35 },
          { name: 'Turkey & Cheese', price: 45 },
        ],
      },
      {
        category: 'Gyro (sandwiches)',
        items: [
          { name: 'Beef Gyro Wrap', price: 55 },
          { name: 'Chicken Gyro', price: 50 },
        ],
      },
    ],
  },
  {
    id: 'miu-cafe',
    name: 'MIU Café',
    location: 'Student Hub, Ground Floor',
    cuisine: 'Café & Snacks',
    hours: '8:00 AM – 8:00 PM',
    image: '/images/miu-cafe.jpg',
    cameraOrbit: '-45deg 70deg 50%',
    fieldOfView: '28deg',
    menu: [
      {
        category: 'General cold drinks',
        items: [
          { name: 'Iced Coffee', price: 40 },
          { name: 'Soft Drink', price: 20 },
          { name: 'Sparkling Water', price: 15 },
        ],
      },
      {
        category: 'Ashraf Farghali (fresh juices)',
        items: [
          { name: 'Fresh Orange Juice', price: 35 },
          { name: 'Fresh Mango Juice', price: 45 },
          { name: 'Strawberry Juice', price: 35 },
        ],
      },
      {
        category: 'TBS (beverages)',
        items: [
          { name: 'Latte', price: 50 },
          { name: 'Cappuccino', price: 45 },
          { name: 'Hot Chocolate', price: 55 },
        ],
      },
    ],
  },
  {
    id: 'main-canteen',
    name: 'Main Canteen',
    location: 'Main Building, Ground Floor',
    cuisine: 'Quick Bites',
    hours: '9:00 AM – 5:00 PM',
    image: '/images/canteen.jpg',
    cameraOrbit: '180deg 70deg 50%',
    fieldOfView: '28deg',
    menu: [
      {
        category: 'Sandwiches',
        items: [
          { name: 'Tuna Sandwich', price: 30 },
          { name: 'Cheese Sandwich', price: 20 },
          { name: 'Club Sandwich', price: 45 },
        ],
      },
      {
        category: 'Snacks',
        items: [
          { name: 'Chips', price: 15 },
          { name: 'Chocolate Bar', price: 20 },
          { name: 'Granola Bar', price: 25 },
        ],
      },
      {
        category: 'Beverages',
        items: [
          { name: 'Soft Drink', price: 20 },
          { name: 'Juice Box', price: 15 },
          { name: 'Water', price: 10 },
        ],
      },
    ],
  },
];

export const facilities = [
  {
    id: 1,
    name: 'Digital Library',
    icon: 'book',
    description: 'Digital resources and computer workstations.',
    location: 'Main Building, Second Floor',
  },
  {
    id: 2,
    name: 'Physical Library',
    icon: 'book-open',
    description: 'Extensive physical book collection and reading areas.',
    location: 'Main Building, Third Floor',
  },
  {
    id: 7,
    name: 'Support Complex',
    icon: 'activity',
    description: 'Dedicated student support and sports services.',
    location: 'North Campus',
  },
  {
    id: 3,
    name: 'Medical Center',
    icon: 'heart',
    description: 'On-campus clinic with full-time medical staff.',
    location: 'Main Building, Ground Floor',
  },
  {
    id: 4,
    name: 'Student Hub',
    icon: 'users',
    description: 'Student union, events space, and club rooms.',
    location: 'Main Building, Second Floor',
  },
  {
    id: 5,
    name: 'Parking',
    icon: 'map-pin',
    description: 'Secure parking for students and staff.',
    location: 'Campus Entrance',
  },
  {
    id: 6,
    name: 'ATM & Bank',
    icon: 'credit-card',
    description: 'On-campus banking services.',
    location: 'Main Building, Ground Floor',
  },
  {
    id: 8,
    name: 'Arts Facilities',
    icon: 'music',
    description: 'Creative hub including a Theatre, Concert Hall, Art Studio, Campus Art Exhibition space, Recording Studio, and an Outdoor Art Space.',
    location: 'Art Facilities Complex',
  },
  {
    id: 9,
    name: 'Restaurants & Dining',
    icon: 'coffee',
    description: 'Multiple dining options including the Main Cafeteria, MIU Café, and Main Canteen offering a variety of cuisines and quick bites.',
    location: 'Campus Wide',
  },
  {
    id: 10,
    name: 'MIU Gym',
    icon: 'dumbbell',
    description: 'Fully equipped fitness center with modern training equipment.',
    location: 'Support Complex',
  },
  {
    id: 11,
    name: 'Football Court',
    icon: 'football',
    description: 'Standard size football field for training and tournaments.',
    location: 'Support Complex',
  },
  {
    id: 12,
    name: 'Basketball Court',
    icon: 'basketball',
    description: 'Professional basketball court with night lighting.',
    location: 'Support Complex',
  },
  {
    id: 13,
    name: 'Handball Court',
    icon: 'handball',
    description: 'Multi-purpose court for handball and other indoor sports.',
    location: 'Support Complex',
  },
];

export const campusEvents = [
  {
    id: 1,
    title: 'Engineering Open Day',
    date: '2025-05-15',
    time: '10:00 AM',
    location: 'Main Building',
    tag: 'Academic',
  },
  {
    id: 2,
    title: 'MIU Sports Tournament',
    date: '2025-05-20',
    time: '2:00 PM',
    location: 'Sports Complex',
    tag: 'Sports',
  },
  {
    id: 3,
    title: 'Campus Art Exhibition',
    date: '2025-05-25',
    time: '11:00 AM',
    location: 'Student Hub',
    tag: 'Culture',
  },
];
export const professors = [
  { id: 'p1', name: 'Dr. Ahmed Hassan', department: 'Computer Science', building: 'main', room: 'M 304', floor: 3 },
  { id: 'p2', name: 'Dr. Mona El-Sayed', department: 'Pharmacy', building: 'pharmacy', room: 'PH 102', floor: 1 },
  { id: 'p3', name: 'Dr. Khaled Mostafa', department: 'Engineering', building: 'main', room: 'M 105', floor: 1 },
  { id: 'p4', name: 'Dr. Nadia Farouk', department: 'Dental Medicine', building: 'dental', room: 'D 110', floor: 1 },
  { id: 'p5', name: 'Dr. Sarah Ibrahim', department: 'Al-Alsun', building: 'main', room: 'M 201', floor: 2 },
  { id: 'p6', name: 'Dr. Mohamed Zaki', department: 'Business Administration', building: 'main', room: 'M 215', floor: 2 },
  { id: 'p7', name: 'Dr. Layla Mahmoud', department: 'Mass Communication', building: 'main', room: 'M 208', floor: 2 },
  { id: 'p8', name: 'Dr. Omar Ali', department: 'Computer Science', building: 'main', room: 'M 312', floor: 3 },
  { id: 'p9', name: 'Dr. Hanaa Soliman', department: 'Engineering', building: 'main', room: 'M 112', floor: 1 },
  { id: 'p10', name: 'Dr. Tarek Fouad', department: 'Pharmacy', building: 'pharmacy', room: 'PH 105', floor: 1 }
];