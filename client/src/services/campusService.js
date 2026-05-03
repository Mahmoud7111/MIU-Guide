import { buildings, campusEvents } from '@/data/campusBuildings';

/**
 * Service for fetching campus-related data.
 * Refactored to return mock data from local files.
 */
export const campusService = {
  /**
   * Fetch all campus buildings and landmarks.
   */
  getBuildings: async () => {
    return { data: buildings };
  },

  /**
   * Fetch specific building details by ID.
   * @param {string} id 
   */
  getBuildingById: async (id) => {
    const building = buildings.find(b => b.id === id || b.slug === id);
    if (building) {
      return { data: building };
    }
    throw new Error('Building not found');
  },

  /**
   * Fetch upcoming campus events.
   */
  getEvents: async () => {
    return { data: campusEvents };
  },
};

export default campusService;
