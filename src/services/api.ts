import { RawEvent, EconomicEvent } from "@/types/event";
import { storeEvents, fetchStoredEvents } from "./eventStorage";

// Base URLs
const FXBOOK_API_URL = "https://www.myfxbook.com/calendar_statement.json";
const LOCAL_API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

/**
 * Fetch economic events from myfxbook Calendar API with fallback to mock data
 */
export const fetchFxBookEvents = async (
  startDate: string,
  endDate: string
): Promise<RawEvent[]> => {
  console.log(`Fetching FXBook events from ${startDate} to ${endDate}`);
  
  try {
    const url = `${FXBOOK_API_URL}?start=${startDate}&end=${endDate}`;
    console.log(`Making API request to: ${url}`);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    const events = Array.isArray(data) ? data as RawEvent[] : [];
    
    if (events.length === 0) {
      throw new Error("No events returned from API");
    }
    
    console.log(`Retrieved ${events.length} events`);
    await storeEvents(events);
    return events;
    
  } catch (error) {
    console.error("Error fetching FXBook events:", error);
    return await getEventsWithFallback(startDate, endDate);
  }
};

/**
 * Fetch events from local API with caching fallback
 */
export const fetchLocalEvents = async (
  startDate: string,
  endDate: string
): Promise<EconomicEvent[]> => {
  try {
    const response = await fetch(
      `${LOCAL_API_URL}/events?start=${startDate}&end=${endDate}`
    );
    
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const events = await response.json();
    await storeEvents(events);
    return events;
    
  } catch (error) {
    console.error('Error fetching local events:', error);
    return await fetchStoredEvents();
  }
};

/**
 * Fallback mechanism with mock data generation
 */
const getEventsWithFallback = async (
  startDate: string,
  endDate: string
): Promise<RawEvent[]> => {
  try {
    const storedEvents = await fetchStoredEvents();
    if (storedEvents.length > 0) {
      console.log(`Using ${storedEvents.length} stored events as fallback`);
      return storedEvents as RawEvent[];
    }
  } catch (error) {
    console.error("Error accessing stored events:", error);
  }

  const mockEvents = generateMockEvents(startDate, endDate);
  console.log(`Generated ${mockEvents.length} mock events as final fallback`);
  
  try {
    await storeEvents(mockEvents);
  } catch (storeError) {
    console.error("Failed to store mock events:", storeError);
  }
  
  return mockEvents;
};

/**
 * Generate mock events for development
 */
const generateMockEvents = (startDate: string, endDate: string): RawEvent[] => {
  console.log(`Generating mock events from ${startDate} to ${endDate}`);
  
  const events: RawEvent[] = [];
  const currencies = ["USD", "EUR", "GBP", "JPY", "CHF"];
  const eventTypes = ["CPI", "GDP", "Unemployment Rate", "Retail Sales", "Interest Rate Decision"];
  const impacts = ["Low", "Medium", "High"];
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  for (let day = new Date(start); day <= end; day.setDate(day.getDate() + 1)) {
    const dateStr = day.toISOString().split("T")[0];
    const eventsPerDay = Math.floor(Math.random() * 3) + 1;
    
    for (let i = 0; i < eventsPerDay; i++) {
      const currency = currencies[Math.floor(Math.random() * currencies.length)];
      const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
      const impact = impacts[Math.floor(Math.random() * impacts.length)] as "Low" | "Medium" | "High";
      
      const previousBase = parseFloat((Math.random() * 5).toFixed(1));
      const forecastDiff = parseFloat((Math.random() * 0.4 - 0.2).toFixed(1));
      const actualDiff = parseFloat((Math.random() * 0.6 - 0.3).toFixed(1));
      
      events.push({
        id: `mock-${dateStr}-${i}-${Math.random().toString(36).substr(2, 5)}`,
        country: getCountryByCurrency(currency),
        currency,
        title: eventType,
        date: dateStr,
        time: `${Math.floor(Math.random() * 24).toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
        impact,
        previous: previousBase.toString(),
        forecast: (previousBase + forecastDiff).toFixed(1),
        actual: (previousBase + forecastDiff + actualDiff).toFixed(1),
      });
    }
  }
  
  return events;
};

const getCountryByCurrency = (currency: string): string => {
  const countries: Record<string, string> = {
    USD: "United States",
    EUR: "Euro Zone",
    GBP: "United Kingdom",
    JPY: "Japan",
    CHF: "Switzerland"
  };
  return countries[currency] || currency;
};

// Alias for backward compatibility
export const fetchEvents = fetchFxBookEvents;
export const getCachedEvents = fetchStoredEvents;