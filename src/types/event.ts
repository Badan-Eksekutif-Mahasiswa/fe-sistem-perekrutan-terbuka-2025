// API Response Types based on documentation
export interface ApiResponse<T> {
  success: boolean;
  status: "success" | "error";
  message: string;
  data: T;
  errors: null;
  meta: null;
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
  eventCode: string;
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
  };
  booklet: string | null;
  socialMedia: {
    [key: string]: unknown;
  };
  faqs?: Array<{ question: string; answer: string }>;
  testimonials?: Array<{ name: string; role: string; message: string; photoUrl?: string }>;
  documentations?: Array<{ title: string; imageUrl: string }>;
  maxDivisionChoices: number;
  organizer: string;
  contactLineId: string;
  contactName?: string;
  contactWhatsapp?: string;
  contactEmail?: string;
  bannerUrl?: string;
  publishedAt?: string;
  archivedAt?: string;
  typeOfEvent: "ORGANISASI" | "KEPANITIAAN" | "UKM";
  eventLevel: "Universitas" | "Fakultas" | "ProgramStudi";
  createdAt: string;
  updatedAt: string;
  divisions: Division[];
}

// API Response Types
export type AllEventsResponse = ApiResponse<Event[]>;
export type EventByIdResponse = ApiResponse<Event>;
