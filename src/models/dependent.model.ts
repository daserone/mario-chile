import { DataRowPacientes } from "./paciente.model";

/*export interface DataRowD extends DataRowPacientes {
  relationship: string;
  idfamiliar: string | number;
  image: Array<string>;
}*/
interface ImageItem {
  url: string;
  extension: string;
}

export interface DataRowDep extends DataRowPacientes {
  relationship: string;
  idfamiliar: string | number;
  image: Array<string>;
  pdf: Array<string>;
  files: ImageItem[];
}
