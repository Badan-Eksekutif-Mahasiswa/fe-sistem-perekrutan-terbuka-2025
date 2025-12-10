export interface User {
  id: string;
  email: string;
  name: string;
  npm: string | null;
  organizationalCode: string | null;
  studyProgram: string | null;
  faculty: string | null;
  year: string | null;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  message?: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (redirectPath?: string) => void;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}
