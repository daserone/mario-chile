export interface ResponseNotificacion {
  responseCode: number;
  message: string;
  id: string | number;
  item: Record<string, unknown> | undefined;
}

export interface ResponseData {
  data: object[];
  recordsTotals: number | string;
  recordsFiltered: number | string;
  currentPage: number | string;
}
