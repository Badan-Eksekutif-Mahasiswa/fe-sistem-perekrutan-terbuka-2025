import {
  RegistrationFormResponse,
  SectionsResponse,
  SubmitResponse,
  PersonalInfoSubmit,
  QuestionSectionSubmit,
  Section,
  ApplicationStatusResponse,
} from "@/types/registration";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "";

export const registrationApi = {
  // GET: Fetch registration form for a section
  async getRegistrationForm(
    eventId: string,
    section: string = "personal-info"
  ): Promise<RegistrationFormResponse> {
    const response = await fetch(
      `${BASE_URL}/registration/form?eventId=${eventId}&section=${encodeURIComponent(
        section
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch registration form");
    }

    return response.json();
  },

  // GET: Fetch all sections for an event
  async getSections(eventId: string): Promise<Section[]> {
    const response = await fetch(
      `${BASE_URL}/registration/sections?eventId=${eventId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch sections");
    }

    const result: SectionsResponse = await response.json();
    return result.data.sections;
  },

  // POST: Create new registration
  async createRegistration(
    data: PersonalInfoSubmit | QuestionSectionSubmit
  ): Promise<SubmitResponse> {
    const response = await fetch(`${BASE_URL}/registration/form`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create registration");
    }

    return response.json();
  },

  // PUT: Update entire section
  async updateRegistration(
    data: PersonalInfoSubmit | QuestionSectionSubmit
  ): Promise<SubmitResponse> {
    const response = await fetch(`${BASE_URL}/registration/form`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to update registration");
    }

    return response.json();
  },

  // PATCH: Partial update (for auto-save)
  async partialUpdateRegistration(
    data: Partial<PersonalInfoSubmit> | Partial<QuestionSectionSubmit>
  ): Promise<SubmitResponse> {
    const response = await fetch(`${BASE_URL}/registration/form`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        error.message || "Failed to partially update registration"
      );
    }

    return response.json();
  },

  // POST: Submit registration (final submit)
  async submitRegistration(eventId: string): Promise<SubmitResponse> {
    const response = await fetch(`${BASE_URL}/registration/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ eventId }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to submit registration");
    }

    return response.json();
  },

  // GET: Get application status
  async getApplicationStatus(
    eventId: string
  ): Promise<ApplicationStatusResponse> {
    const response = await fetch(
      `${BASE_URL}/registration/status?eventId=${eventId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to get application status");
    }

    return response.json();
  },
};
