import { DataRowPacientes } from "./paciente.model";

export interface DataRowD extends DataRowPacientes {
  relationship: string;
  idfamiliar: string | number;
  image: Array<string>;
}
