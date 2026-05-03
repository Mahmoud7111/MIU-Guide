import { NEWS } from '@/data/news';

/**
 * Service for fetching university events.
 */
export const getEvents = async () => {
  // Return news items categorized as 'Event'
  const events = NEWS.filter(item => item.category === 'Event' || item.category === 'Achievement');
  return { data: events };
};
