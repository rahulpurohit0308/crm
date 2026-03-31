export interface AuthRequest {
  name?: string;
  email: string;
  password: string;
  role?: string;
}

export interface AuthResponse {
  token: string;
  email: string;
  name: string;
  role: string;
}