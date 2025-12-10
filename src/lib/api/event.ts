import { Event, AllEventsResponse, EventByIdResponse } from "@/types/event";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

/**
 * Fetch all events with their divisions
 * @returns Promise<Event[]>
 */
export async function getAllEvents(): Promise<Event[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/event`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Server-side rendering with fresh data
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch events: ${response.statusText}`);
    }

    const result: AllEventsResponse = await response.json();

    if (!result.success) {
      throw new Error(result.message || "Failed to fetch events");
    }

    return result.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
}

/**
 * Fetch a single event by ID with its divisions
 * @param id - Event ID
 * @returns Promise<Event>
 */
export async function getEventById(id: string): Promise<Event> {
  try {
    const response = await fetch(`${API_BASE_URL}/event/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Server-side rendering with fresh data
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Event not found");
      }
      throw new Error(`Failed to fetch event: ${response.statusText}`);
    }

    const result: EventByIdResponse = await response.json();

    if (!result.success) {
      throw new Error(result.message || "Failed to fetch event");
    }

    return result.data;
  } catch (error) {
    console.error("Error fetching event:", error);
    throw error;
  }
}
