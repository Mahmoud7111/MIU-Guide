/**
 * Service for fetching student schedules.
 * Refactored to return mock data.
 */
export const getSchedule = async () => {
  const mockSchedule = [
    { id: 1, subject: 'Computer Graphics', time: '09:00 AM - 11:00 AM', day: 'Sunday', room: 'Lab 102' },
    { id: 2, subject: 'Software Engineering', time: '11:30 AM - 01:30 PM', day: 'Sunday', room: 'Hall 3' },
    { id: 3, subject: 'Network Security', time: '09:00 AM - 11:00 AM', day: 'Monday', room: 'Lab 205' },
    { id: 4, subject: 'Project Management', time: '01:00 PM - 03:00 PM', day: 'Tuesday', room: 'Hall 1' },
    { id: 5, subject: 'Database Systems', time: '10:00 AM - 12:00 PM', day: 'Wednesday', room: 'Lab 101' },
  ];
  
  return { data: mockSchedule };
};
