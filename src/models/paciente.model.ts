export interface DataRowPacientes {
  idusuario: string | number;
  idpaciente: string | number;
  iddocumento: string | number;
  document: string;
  documentType: string;
  name: string;
  email: string;
  age: string;
  birthdate: string;
  phone: string;
  profileType: string;
  kinship: string;
  verification: "verificacion-automatica" | "verificacion-manual";
  profileImage?: string;
  registrationDate: string;
}

interface ImageItem {
  url: string;
  extension: string;
}

export interface DataRowPac extends DataRowPacientes {
  image?: Array<string>;
  pdf?: Array<string>;
  files: ImageItem[];
}
