import { BACKEND_URL } from "@/lib/api/config";

const BASE_URL = BACKEND_URL;

export type AdminApplicationStatus =
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "PASSED_ADMINISTRATION"
  | "REJECTED_ADMINISTRATION";

export type AdminEmailType =
  | "REGISTRATION_CONFIRMATION"
  | "PASSED_ADMINISTRATION"
  | "REJECTED_ADMINISTRATION";

export type AdminEmailStatus = "PENDING" | "SENT" | "FAILED";

export type AdminEvent = {
  id: string;
  eventCode: string | null;
  title: string;
  description: string;
  organizer: string;
  status: "DRAFT" | "ACTIVE" | "CLOSED" | "ARCHIVED";
  typeOfEvent?: string | null;
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
  divisions?: Array<{ id: string; name: string; isActive?: boolean }>;
};

export type AdminRegistrationListItem = {
  registration_code: string;
  status: AdminApplicationStatus;
  submitted_at: string;
  user: {
    name: string;
    email: string | null;
    npm: string | null;
  };
  division_choice_1: { id: string; name: string } | null;
  division_choice_2: { id: string; name: string } | null;
};

export type AdminApplicationDetail = {
  registration_code: string;
  status: AdminApplicationStatus;
  submitted_at: string;
  reviewed_at: string | null;
  final_decision_at: string | null;
  user: {
    name: string;
    npm: string | null;
    email: string | null;
    faculty: string | null;
    studyProgram: string | null;
    line_id: string | null;
    whatsapp: string | null;
  };
  division_choice_1: { id: string; name: string } | null;
  division_choice_2: { id: string; name: string } | null;
  submission_links: Array<{
    requirement: string;
    scope: string;
    url: string;
  }>;
};

export type AdminEventSummary = {
  event_code: string;
  title: string;
  status: AdminEvent["status"];
  registration_open: string;
  registration_close: string;
  total_registrants: number;
  by_status: Record<AdminApplicationStatus, number>;
};

export type AdminRegistrationsQuery = {
  status?: AdminApplicationStatus | "ALL";
  divisionId?: string;
  search?: string;
  page?: number;
  limit?: number;
  sort?: "submitted_at" | "name" | "status";
  order?: "asc" | "desc";
};

export type AdminAnnouncementSummary = {
  type: AdminEmailType;
  dryRun: boolean;
  eligible: number;
  sent: number;
  failed: number;
  skipped: number;
  quota?: {
    limit: number | null;
    sentToday: number;
    remaining: number | null;
    target: number;
    canSend: boolean;
    resetAt: string;
  };
};

export type AdminEmailLog = {
  id: string;
  type: AdminEmailType;
  status: AdminEmailStatus;
  recipient_email: string;
  subject: string;
  additional_message: string | null;
  error_message: string | null;
  registration_id: string;
  applicant_name: string | null;
  sent_by_id: string;
  sent_at: string | null;
  created_at: string;
};

export type AdminEmailLogQuery = {
  type?: AdminEmailType | "ALL";
  status?: AdminEmailStatus | "ALL";
  page?: number;
  limit?: number;
};

type ApiResponse<T> = {
  success: boolean;
  message: string | null;
  data: T;
  meta?: Record<string, unknown> | null;
};

export type PaginatedResponse<T> = {
  data: T;
  meta: {
    total: number;
    page: number;
    limit: number;
    total_pages: number;
  };
};

async function requestJson<T>(
  path: string,
  init?: RequestInit
): Promise<ApiResponse<T>> {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: init?.method || "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    body: init?.body,
  });

  const result: ApiResponse<T> = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Request failed");
  }

  return result;
}

async function fetchJson<T>(path: string): Promise<T> {
  const result = await requestJson<T>(path);
  return result.data;
}

function toQueryString(query?: AdminRegistrationsQuery) {
  if (!query) return "";

  const params = new URLSearchParams();

  if (query.status && query.status !== "ALL") params.set("status", query.status);
  if (query.divisionId) params.set("division_id", query.divisionId);
  if (query.search?.trim()) params.set("search", query.search.trim());
  if (query.page) params.set("page", String(query.page));
  if (query.limit) params.set("limit", String(query.limit));
  if (query.sort) params.set("sort", query.sort);
  if (query.order) params.set("order", query.order);

  const value = params.toString();
  return value ? `?${value}` : "";
}

function toEmailLogQueryString(query?: AdminEmailLogQuery) {
  if (!query) return "";

  const params = new URLSearchParams();

  if (query.type && query.type !== "ALL") params.set("type", query.type);
  if (query.status && query.status !== "ALL") params.set("status", query.status);
  if (query.page) params.set("page", String(query.page));
  if (query.limit) params.set("limit", String(query.limit));

  const value = params.toString();
  return value ? `?${value}` : "";
}

export const adminApi = {
  async getEvents() {
    return fetchJson<{ events: AdminEvent[]; total: number }>("/admin/events");
  },

  async getEventSummary(eventId: string) {
    return fetchJson<AdminEventSummary>(`/admin/events/${eventId}/summary`);
  },

  async getEventRegistrations(
    eventId: string,
    query?: AdminRegistrationsQuery
  ): Promise<PaginatedResponse<AdminRegistrationListItem[]>> {
    const result = await requestJson<AdminRegistrationListItem[]>(
      `/admin/events/${eventId}/registrations${toQueryString(query)}`
    );

    return {
      data: result.data,
      meta: {
        total: Number(result.meta?.total ?? result.data.length),
        page: Number(result.meta?.page ?? query?.page ?? 1),
        limit: Number(result.meta?.limit ?? query?.limit ?? result.data.length),
        total_pages: Number(result.meta?.total_pages ?? 1),
      },
    };
  },

  async getApplicationDetail(applicationId: string) {
    return fetchJson<AdminApplicationDetail>(`/admin/applications/${applicationId}`);
  },

  async updateApplicationStatus(
    applicationId: string,
    status: AdminApplicationStatus
  ) {
    const result = await requestJson<{
      registration_code: string;
      status: AdminApplicationStatus;
      reviewed_at: string | null;
      final_decision_at: string | null;
      updated_at: string;
    }>(`/admin/applications/${applicationId}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });

    return result.data;
  },

  async exportRegistrationsCsv(eventId: string) {
    const response = await fetch(`${BASE_URL}/admin/events/${eventId}/export`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      const contentType = response.headers.get("Content-Type") || "";
      if (contentType.includes("application/json")) {
        const result = (await response.json()) as ApiResponse<null>;
        throw new Error(result.message || "Gagal export CSV");
      }
      throw new Error("Gagal export CSV");
    }

    return response.blob();
  },

  async sendAnnouncement(
    eventId: string,
    payload: {
      type: AdminEmailType;
      additionalMessage?: string | null;
      divisionId?: string | null;
      force?: boolean;
      dryRun?: boolean;
    }
  ) {
    const result = await requestJson<AdminAnnouncementSummary>(
      `/admin/events/${eventId}/announcements`,
      {
        method: "POST",
        body: JSON.stringify(payload),
      }
    );

    return result.data;
  },

  async getEventEmails(
    eventId: string,
    query?: AdminEmailLogQuery
  ): Promise<PaginatedResponse<AdminEmailLog[]>> {
    const result = await requestJson<AdminEmailLog[]>(
      `/admin/events/${eventId}/emails${toEmailLogQueryString(query)}`
    );

    return {
      data: result.data,
      meta: {
        total: Number(result.meta?.total ?? result.data.length),
        page: Number(result.meta?.page ?? query?.page ?? 1),
        limit: Number(result.meta?.limit ?? query?.limit ?? result.data.length),
        total_pages: Number(result.meta?.total_pages ?? 1),
      },
    };
  },
};
