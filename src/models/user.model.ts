export interface User {
  id: number;
  name: string;
  lastName?: string;
  email: string;
}

export interface UserSession extends User {
  token: string;
  active: boolean;
}
