import { createSlice } from "@reduxjs/toolkit";
import { UserSession } from "@src/models";
import {
  clearLocalStorage,
  persistLocalStorage,
  getLocalStorage,
} from "../../helpers/helpers";

export const userKey = "user-backoffice";

const TOKEN_KEY = import.meta.env.TOKEN_KEY;

export const initial: UserSession = {
  id: 0,
  name: "",
  email: "",
  token: "",
  active: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState: getLocalStorage(userKey) ? getLocalStorage(userKey) : initial,
  reducers: {
    createUser: (state, action) => {
      if (action.payload.token) {
        localStorage.setItem(TOKEN_KEY, JSON.stringify(action.payload.token));
      }

      persistLocalStorage<UserSession>(userKey, action.payload);
      return action.payload;
    },
    updateUser: (state, action) => {
      const result = { ...state, ...action.payload };
      persistLocalStorage<UserSession>(userKey, result);
      return result;
    },
    reset: () => {
      clearLocalStorage(userKey);
      return initial;
    },
  },
});

export const { createUser, updateUser, reset } = userSlice.actions;
export default userSlice.reducer;
