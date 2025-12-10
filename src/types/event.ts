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
  interviewLink: string | null;
  createdAt: string;
  updatedAt: string;
}

// Event Type
export interface Event {
  id: string;
  title: string;
  description: string;
  logo: string | null;
  openRegistration: string;
  closeRegistration: string;
  timeline: {
    [key: string]: unknown;
  };
  booklet: string | null;
  socialMedia: {
    [key: string]: unknown;
  };
  maxChooseDivision: number;
  typeOfEvent: "ORGANISASI" | "KEPANITIAAN" | "UKM";
  eventLevel: "Universitas" | "Fakultas" | "ProgramStudi";
  createdAt: string;
  updatedAt: string;
  divisions: Division[];
}

// API Response Types
export type AllEventsResponse = ApiResponse<Event[]>;
export type EventByIdResponse = ApiResponse<Event>;
