export interface LoginResponse {
  accessToken: string;
  tokenType: string;
  user: User;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  is_admin: boolean;
  hashed_password: string;
  is_active: boolean;
  user_role: UserRole[];
}

export interface UserRole {
  id: string;
  role: Company;
  company: Company;
}

export interface Company {
  id: string;
  name: string;
  description: string;
  apiKey?: string;
  isActive: boolean;
  scope?: Scope;
}

export interface Scope {}

export interface LoginRequest {
  username: string;
  password: string;
}
