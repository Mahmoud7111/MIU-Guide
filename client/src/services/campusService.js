import http from '../lib/api/http';
import { ENDPOINTS } from '../lib/api/endpoints';

/**
 * Service for fetching campus-related data.
 */
export const campusService = {
  /**
   * Fetch all campus buildings and landmarks.
   */
  getBuildings: () => http.get(ENDPOINTS.BUILDINGS),

  /**
   * Fetch specific building details by ID.
   * @param {string} id 
   */
  getBuildingById: (id) => http.get(`${ENDPOINTS.BUILDINGS}/${id}`),

  /**
   * Fetch upcoming campus events.
   */
  getEvents: () => http.get(ENDPOINTS.EVENTS),
};

export default campusService;
