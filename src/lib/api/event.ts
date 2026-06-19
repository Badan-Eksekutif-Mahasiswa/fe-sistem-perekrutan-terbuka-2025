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

/**
 * Fetch a single admin-owned event by ID or event code.
 */
export async function getAdminEventById(id: string): Promise<Event> {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/events/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      cache: "no-store",
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Event not found");
      }
      throw new Error(`Failed to fetch event: ${response.statusText}`);
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || "Failed to fetch event");
    }

    return result.data.event ?? result.data;
  } catch (error) {
    console.error("Error fetching admin event:", error);
    throw error;
  }
}

/**
 * Create a new event
 */
export async function createEvent(data: Partial<Event>): Promise<Event> {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Failed to create event");
    const result = await response.json();
    if (!result.success) throw new Error(result.message);
    return result.data.event ?? result.data;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
}

/**
 * Update an event
 */
export async function updateEvent(id: string, data: Partial<Event>): Promise<Event> {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/events/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Failed to update event");
    const result = await response.json();
    if (!result.success) throw new Error(result.message);
    return result.data.event ?? result.data;
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
}

/**
 * Delete an event
 */
export async function deleteEvent(id: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/events/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!response.ok) throw new Error("Failed to delete event");
    const result = await response.json();
    if (!result.success) throw new Error(result.message);
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
}

/**
 * Create a new division
 */
export async function createDivision(data: any): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/events/${data.eventId}/divisions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Failed to create division");
    const result = await response.json();
    if (!result.success) throw new Error(result.message);
    return result.data.division ?? result.data;
  } catch (error) {
    console.error("Error creating division:", error);
    throw error;
  }
}

/**
 * Update a division
 */
export async function updateDivision(id: string, data: any): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/divisions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Failed to update division");
    const result = await response.json();
    if (!result.success) throw new Error(result.message);
    return result.data.division ?? result.data;
  } catch (error) {
    console.error("Error updating division:", error);
    throw error;
  }
}

/**
 * Delete a division
 */
export async function deleteDivision(id: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/divisions/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!response.ok) throw new Error("Failed to delete division");
    const result = await response.json();
    if (!result.success) throw new Error(result.message);
  } catch (error) {
    console.error("Error deleting division:", error);
    throw error;
  }
}

