import { EconomicEvent } from "@/types/event";

// Store events in localStorage
export const storeEvents = async (events: EconomicEvent[]): Promise<void> => {
  try {
    localStorage.setItem('economicEvents', JSON.stringify(events));
  } catch (error) {
    console.error('Error storing events:', error);
    throw new Error('Failed to store events');
  }
};

// Fetch events from localStorage
export const fetchStoredEvents = async (): Promise<EconomicEvent[]> => {
  try {
    const storedData = localStorage.getItem('economicEvents');
    return storedData ? JSON.parse(storedData) : [];
  } catch (error) {
    console.error('Error fetching stored events:', error);
    return [];
  }
};

// Clear all stored events
export const clearStoredEvents = async (): Promise<void> => {
  localStorage.removeItem('economicEvents');
};