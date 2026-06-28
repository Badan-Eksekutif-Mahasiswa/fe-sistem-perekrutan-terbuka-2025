import type { Event } from "./event";

export type QuestionType = "INPUT" | "INFORMATION";

export type QuestionInputType =
  | "SHORT_TEXT"
  | "LONG_TEXT"
  | "SINGLE_CHOICE"
  | "MULTIPLE_CHOICE"
  | "DROPDOWN"
  | "NUMBER"
  | "DATE"
  | "BUTTON";

export interface Option {
  id: string;
  label: string;
  value: string;
  order: number;
}

export interface Question {
  id: string;
  question: string;
  description: string | null;
  order: number;
  type: QuestionType;
  inputType: QuestionInputType | null;
  isRequired: boolean;
  answer: string | null;
  options: Option[];
}

export interface Division {
  id: string;
  name: string;
  description: string;
}

export interface SelectedDivision {
  divisionId: string;
  divisionName: string;
  priority: number;
}

export interface PersonalInfoData {
  name: string;
  npm: string;
  email: string;
  faculty: string;
  studyProgram: string;
  line: string;
  availableDivisions: Division[];
  maxDivisionChoices: number;
  selectedDivisions: SelectedDivision[];
}

export interface QuestionSectionData {
  section: string;
  title: string;
  description: string;
  order: number;
  questions: Question[];
}

export interface Section {
  id: string;
  name: string;
  order: number;
}

export interface RegistrationFormResponse {
  success: boolean;
  message: string;
  data: {
    event: Event;
    applicant: {
      id: string;
      name: string;
      npm: string | null;
      faculty: string | null;
      studyProgram: string | null;
      year: string | null;
    };
    canRegister: boolean;
    hasRegistration: boolean;
    registrationId: string | null;
    draft: RegistrationDraft | null;
  };
}

export interface SectionsResponse {
  success: boolean;
  status: string;
  message: string;
  data: {
    sections: Section[];
  };
  errors: null;
  meta: null;
}

export interface SubmitResponse {
  success: boolean;
  message: string;
  data: {
    registrationId: string;
    eventId: string;
    status: RegistrationStatus;
    submittedAt?: string;
  } | null;
}

export interface RegistrationSubmissionLinkInput {
  requirementId: string;
  submittedUrl: string;
}

export interface RegistrationPayload {
  eventId: string;
  contactEmail: string;
  whatsappNumber?: string | null;
  lineId?: string | null;
  divisionChoices: string[];
  submissionLinks: RegistrationSubmissionLinkInput[];
}

export interface RegistrationDraft {
  id: string;
  eventId: string;
  userId: string;
  contactEmail: string;
  whatsappNumber: string | null;
  lineId: string | null;
  status: RegistrationStatus;
  submittedAt: string;
  reviewedAt: string | null;
  decidedAt: string | null;
  choices: Array<{
    id: string;
    registrationId: string;
    divisionId: string;
    choiceOrder: number;
  }>;
  submissionLinks: Array<{
    id: string;
    registrationId: string;
    requirementId: string;
    submittedUrl: string;
    createdAt: string;
  }>;
}

export interface PersonalInfoSubmit {
  eventId: string;
  section: string;
  line: string;
  divisions: string[];
}

export interface AnswerSubmit {
  questionId: string;
  value: string;
}

export interface QuestionSectionSubmit {
  eventId: string;
  section: string;
  answers: AnswerSubmit[];
}

export type RegistrationStatus =
  | "DRAFT"
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "PASSED_ADMINISTRATION"
  | "REJECTED_ADMINISTRATION";

export interface RegistrationStatusResponse {
  success: boolean;
  message: string;
  data: {
    hasRegistration: boolean;
    canRegister: boolean;
    registration?: {
      id: string;
      status: RegistrationStatus;
      contactEmail: string;
      whatsappNumber: string | null;
      lineId: string | null;
      submittedAt: string;
      reviewedAt: string | null;
      decidedAt: string | null;
      choices: Array<{
        choiceOrder: number;
        divisionId: string;
        division: { id: string; name: string };
      }>;
      submissionLinks: Array<{
        requirementId: string;
        submittedUrl: string;
        requirement: { title: string; scope: "EVENT" | "DIVISION" };
      }>;
      emailLogs: unknown[];
    };
  };
}

export interface ApplicationDivision {
  divisionId: string;
  divisionName: string;
  choiceOrder: number;
}

export interface MyApplication {
  id: string;
  eventId: string;
  eventCode: string | null;
  eventTitle: string;
  eventLogo: string | null;
  typeOfEvent: Event["typeOfEvent"];
  eventLevel: Event["eventLevel"];
  status: RegistrationStatus;
  submittedAt: string | null;
  lastEditedAt: string | null;
  selectedDivisions: ApplicationDivision[];
}

export interface MyApplicationsResponse {
  success: boolean;
  message: string;
  data: {
    applications: MyApplication[];
    total: number;
  };
}
