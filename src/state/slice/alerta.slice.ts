import { createSlice } from "@reduxjs/toolkit";
import { alerta } from "@src/models/alerta.model";

export const initial: alerta = {
  path: "",
};

export const alertaSlice = createSlice({
  name: "alerta",
  initialState: initial,
  reducers: {
    toggle: (state, action) => {
      state.path = action.payload;
    },
  },
});

export const { toggle } = alertaSlice.actions;

export default alertaSlice.reducer;
