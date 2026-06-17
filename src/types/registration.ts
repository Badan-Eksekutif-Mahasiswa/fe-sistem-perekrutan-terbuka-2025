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
    applicationId: string;
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

export interface ApplicationStatusResponse {
  success: boolean;
  message: string;
  data: {
    hasApplication: boolean;
    applicationId?: string;
    isSubmitted: boolean;
    submittedAt?: string;
    lastEditedAt?: string;
    stage?: string;
    allRequiredFieldsFilled?: boolean;
    canModify?: boolean;
    selectedDivisions?: SelectedDivision[];
  };
}

export type SelectionStage =
  | "DOCUMENT_SCREENING"
  | "INTERVIEW"
  | "ACCEPTED"
  | "REJECTED";

export interface ApplicationDivision {
  divisionId: string;
  divisionName: string;
  priority: number;
  stage: SelectionStage | null;
}

export interface MyApplication {
  id: string;
  eventId: string;
  eventTitle: string;
  eventLogo: string | null;
  typeOfEvent: string;
  eventLevel: string;
  registrationOpen: string;
  registrationClose: string;
  isSubmitted: boolean;
  submittedAt: string | null;
  lastEditedAt: string;
  stage: SelectionStage | null;
  selectedDivisions: ApplicationDivision[];
  createdAt: string;
  updatedAt: string;
}

export interface MyApplicationsResponse {
  success: boolean;
  message: string;
  data: {
    applications: MyApplication[];
    total: number;
  };
}
