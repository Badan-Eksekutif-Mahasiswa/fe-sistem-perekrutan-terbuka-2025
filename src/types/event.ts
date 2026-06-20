// API Response Types based on documentation
export interface ApiResponse<T> {
  success: boolean;
  status: "success" | "error";
  message: string | null;
  data: T;
  errors: unknown[] | null;
  meta: Record<string, unknown> | null;
}

// Division Type
export interface Division {
  id: string;
  name: string;
  description: string | null;
  jobdesc: string | null;
  PIC: {
    name?: string;
    contact?: string;
    [key: string]: unknown;
  };
  eventId: string;
  cover: string | null;
  interviewLink: string | null;
  taskUrl: string | null;
  maxQuota: number | null;
  hasDivisionTask: boolean;
  taskDescription: string | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type EventStatus = "DRAFT" | "ACTIVE" | "CLOSED" | "ARCHIVED";

// Event Type
export interface Event {
  id: string;
  eventCode: string | null;
  title: string;
  description: string;
  logo: string | null;
  status: EventStatus;
  registrationOpen: string;
  registrationClose: string;
  closedAt: string | null;
  maxRegistrants: number | null;
  requiresGeneralTask: boolean;
  generalTaskUrl: string | null;
  timeline: {
    [key: string]: unknown;
  } | null;
  booklet: string | null;
  socialMedia: {
    [key: string]: unknown;
  } | null;
  faqs?: Array<{ question: string; answer: string }> | null;
  testimonials?: Array<{ name: string; role: string; message: string; photoUrl?: string }> | null;
  documentations?: Array<{ title: string; imageUrl: string }> | null;
  maxDivisionChoices: number;
  organizer: string;
  contactLineId: string;
  contactName?: string | null;
  contactWhatsapp?: string | null;
  contactEmail?: string | null;
  bannerUrl?: string;
  publishedAt?: string | null;
  archivedAt?: string | null;
  typeOfEvent: "ORGANISASI" | "KEPANITIAAN" | "UKM" | null;
  eventLevel: "Universitas" | "Fakultas" | "ProgramStudi" | null;
  createdAt: string;
  updatedAt: string;
  divisions: Division[];
}

// API Response Types
export type AllEventsResponse = ApiResponse<Event[]>;
export type EventByIdResponse = ApiResponse<Event>;
