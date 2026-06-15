const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export type AdminEvent = {
  id: string;
  title: string;
  description: string;
  organizer: string;
  status: "DRAFT" | "PUBLISHED" | "CLOSED" | "ARCHIVED";
  registrationOpen: string;
  registrationClose: string;
  ownerId: string;
  owner?: {
    id: string;
    name: string;
    email: string | null;
  };
  _count?: {
    registrations: number;
    divisions: number;
  };
};

export type AdminRegistration = {
  id: string;
  contactEmail: string;
  whatsappNumber: string | null;
  lineId: string | null;
  status:
    | "SUBMITTED"
    | "UNDER_REVIEW"
    | "PASSED_ADMINISTRATION"
    | "REJECTED_ADMINISTRATION";
  submittedAt: string;
  user: {
    id: string;
    name: string;
    npm: string | null;
    faculty: string | null;
    studyProgram: string | null;
    year: string | null;
  };
  choices: Array<{
    id: string;
    choiceOrder: number;
    division: {
      id: string;
      name: string;
    };
  }>;
};

type ApiResponse<T> = {
  success: boolean;
  message: string | null;
  data: T;
};

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result: ApiResponse<T> = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Request failed");
  }

  return result.data;
}

export const adminApi = {
  async getEvents() {
    return fetchJson<{ events: AdminEvent[]; total: number }>("/admin/events");
  },

  async getEventRegistrations(eventId: string) {
    return fetchJson<{
      event: { id: string; title: string; status: AdminEvent["status"] };
      registrations: AdminRegistration[];
      total: number;
    }>(`/admin/events/${eventId}/registrations`);
  },
};
