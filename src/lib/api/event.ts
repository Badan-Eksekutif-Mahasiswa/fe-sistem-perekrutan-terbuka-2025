import { Division, Event, AllEventsResponse, EventByIdResponse } from "@/types/event";
import { BACKEND_URL } from "@/lib/api/config";

const API_BASE_URL = BACKEND_URL;

type ApiResponse<T> = {
  success: boolean;
  message: string | null;
  data: T;
};

type EventWrappedResponse = Event | { event: Event };
type DivisionWrappedResponse = Division | { division: Division };

export type EventTimelineItem = {
  startDate: string;
  endDate: string;
  title: string;
  description: string;
};

export type EventFaqItem = {
  question: string;
  answer: string;
};

export type EventTestimonialItem = {
  name: string;
  role: string;
  message: string;
  photoUrl: string;
};

export type EventDocumentationItem = {
  title: string;
  imageUrl: string;
};

export type EventPayload = Partial<
  Omit<
    Event,
    | "divisions"
    | "timeline"
    | "socialMedia"
    | "faqs"
    | "testimonials"
    | "documentations"
  >
> & {
  ownerId?: string;
  timeline?: EventTimelineItem[];
  socialMedia?: Record<string, string>;
  faqs?: EventFaqItem[];
  testimonials?: EventTestimonialItem[];
  documentations?: EventDocumentationItem[];
};

export type EventFormDivision = {
  id: string;
  name: string;
  coverUrl: string;
  maxQuota: number | "";
  isActive: boolean;
  description: string;
  jobdesc: string;
  taskUrl: string;
  picName: string;
  picContact: string;
};

export type DivisionPayload = {
  eventId: string;
  name: string;
  cover?: string;
  maxQuota?: number | null;
  isActive?: boolean;
  description?: string;
  jobdesc?: string;
  taskUrl?: string;
  PIC?: {
    name: string;
    contact: string;
  };
};

function unwrapEvent(data: EventWrappedResponse): Event {
  return "event" in data ? data.event : data;
}

function unwrapDivision(data: DivisionWrappedResponse): Division {
  return "division" in data ? data.division : data;
}

async function parseJson<T>(response: Response): Promise<ApiResponse<T>> {
  return response.json() as Promise<ApiResponse<T>>;
}

async function readApiError(response: Response, fallback: string) {
  try {
    const result = (await response.json()) as Partial<ApiResponse<unknown>>;
    return new Error(result.message || fallback);
  } catch {
    return new Error(fallback);
  }
}

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

    const result = await parseJson<EventWrappedResponse>(response);

    if (!result.success) {
      throw new Error(result.message || "Failed to fetch event");
    }

    return unwrapEvent(result.data);
  } catch (error) {
    console.error("Error fetching admin event:", error);
    throw error;
  }
}

/**
 * Create a new event
 */
export async function createEvent(data: EventPayload): Promise<Event> {
  const response = await fetch(`${API_BASE_URL}/admin/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!response.ok) throw await readApiError(response, "Failed to create event");
  const result = await parseJson<EventWrappedResponse>(response);
  if (!result.success) throw new Error(result.message || "Failed to create event");
  return unwrapEvent(result.data);
}

/**
 * Update an event
 */
export async function updateEvent(id: string, data: EventPayload): Promise<Event> {
  const response = await fetch(`${API_BASE_URL}/admin/events/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!response.ok) throw await readApiError(response, "Failed to update event");
  const result = await parseJson<EventWrappedResponse>(response);
  if (!result.success) throw new Error(result.message || "Failed to update event");
  return unwrapEvent(result.data);
}

/**
 * Delete an event
 */
export async function deleteEvent(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/admin/events/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!response.ok) throw await readApiError(response, "Failed to delete event");
  const result = await parseJson<null>(response);
  if (!result.success) throw new Error(result.message || "Failed to delete event");
}

/**
 * Create a new division
 */
export async function createDivision(data: DivisionPayload): Promise<Division> {
  const response = await fetch(`${API_BASE_URL}/admin/events/${data.eventId}/divisions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!response.ok) throw await readApiError(response, "Failed to create division");
  const result = await parseJson<DivisionWrappedResponse>(response);
  if (!result.success) throw new Error(result.message || "Failed to create division");
  return unwrapDivision(result.data);
}

/**
 * Update a division
 */
export async function updateDivision(id: string, data: DivisionPayload): Promise<Division> {
  const response = await fetch(`${API_BASE_URL}/admin/divisions/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!response.ok) throw await readApiError(response, "Failed to update division");
  const result = await parseJson<DivisionWrappedResponse>(response);
  if (!result.success) throw new Error(result.message || "Failed to update division");
  return unwrapDivision(result.data);
}

/**
 * Delete a division
 */
export async function deleteDivision(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/admin/divisions/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!response.ok) throw await readApiError(response, "Failed to delete division");
  const result = await parseJson<null>(response);
  if (!result.success) throw new Error(result.message || "Failed to delete division");
}
