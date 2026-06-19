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
    section: string;
    title: string;
    description: string;
    data?: PersonalInfoData;
    order?: number;
    questions?: Question[];
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
  eventTitle: string;
  status: RegistrationStatus;
  submittedAt: string | null;
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
