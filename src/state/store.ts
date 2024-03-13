import { configureStore } from "@reduxjs/toolkit";
import { UserSession, alerta, LayoutSlice } from "@src/models";
import { userSlice } from "./slice/user";
import { alertaSlice } from "./slice/alerta.slice";
import { layoutSlice } from "./slice/layout.slice";

export interface AppStore {
  auth: UserSession | null;
  alerta: alerta;
  layoutSlice: LayoutSlice;
}
export default configureStore<AppStore>({
  reducer: {
    auth: userSlice.reducer,
    alerta: alertaSlice.reducer,
    layoutSlice: layoutSlice.reducer,
  },
});
