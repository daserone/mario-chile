export interface User {
  id: number | string;
  name: string;
  lastName?: string;
  email: string;
  image?: string;
}

export interface UserDataRow extends User {
  idpersonal: string | number;
  phone: string;
  state: string;
}

export interface UserSession extends User {
  token: string;
  active: boolean;
}
