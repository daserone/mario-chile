import { configureStore } from "@reduxjs/toolkit";
import { User, alerta, LayoutSlice, CompanyState } from "@src/models";
import { userSlice } from "./slice/user";
import { alertaSlice } from "./slice/alerta.slice";
import { layoutSlice } from "./slice/layout.slice";
import { companiesSlice } from "./slice/companies.slice";
import { useDispatch } from "react-redux";

export interface AppStore {
  auth: User | null;
  alerta: alerta;
  layoutSlice: LayoutSlice;
  companies: CompanyState | any;
}
const store = configureStore<AppStore>({
  reducer: {
    auth: userSlice.reducer,
    alerta: alertaSlice.reducer,
    layoutSlice: layoutSlice.reducer,
    companies: companiesSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default store;
