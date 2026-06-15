export interface User {
  id: string;
  role?: "APPLICANT" | "ADMIN" | "SUPERADMIN";
  authProvider?: "SSO" | "INTERNAL";
  ssoId?: string | null;
  email: string | null;
  name: string;
  npm: string | null;
  organizationalCode: string | null;
  studyProgram: string | null;
  faculty: string | null;
  year: string | null;
  emailVerified: boolean;
  isActive?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  status?: "success" | "error";
  user?: User;
  data?: {
    user?: User;
    ssoLogoutUrl?: string | null;
    resetUrl?: string;
  } | null;
  message?: string;
  errors?: unknown[] | null;
  meta?: Record<string, unknown> | null;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (redirectPath?: string) => void;
  internalLogin: (email: string, password: string) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}
