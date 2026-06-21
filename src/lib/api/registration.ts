import {
  RegistrationFormResponse,
  SubmitResponse,
  RegistrationPayload,
  RegistrationStatusResponse,
  MyApplicationsResponse,
} from "@/types/registration";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "";

export const registrationApi = {
  // GET: Fetch registration form data for an event
  async getRegistrationForm(eventId: string): Promise<RegistrationFormResponse> {
    const response = await fetch(
      `${BASE_URL}/registration/form?eventId=${eventId}`,
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

  // POST: Create new draft registration
  async createRegistration(data: RegistrationPayload): Promise<SubmitResponse> {
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

  // PUT: Replace draft registration data
  async updateRegistration(data: RegistrationPayload): Promise<SubmitResponse> {
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

  // PATCH: Partial update for draft registration
  async partialUpdateRegistration(
    data: Partial<RegistrationPayload> & { eventId: string }
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
  async submitRegistration(data: RegistrationPayload): Promise<SubmitResponse> {
    const response = await fetch(`${BASE_URL}/registration/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
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
  ): Promise<RegistrationStatusResponse> {
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

  // GET: Get my applications
  async getMyApplications(): Promise<MyApplicationsResponse> {
    const response = await fetch(`${BASE_URL}/registration/my-applications`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to get my applications");
    }

    return response.json();
  },
};
