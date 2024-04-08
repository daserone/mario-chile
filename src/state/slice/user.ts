import { createSlice } from "@reduxjs/toolkit";
import { User } from "@src/models";
import {
  clearLocalStorage,
  persistLocalStorage,
  getLocalStorage,
} from "../../helpers/helpers";

const TOKEN_KEY = process.env.NOWLI_TOKEN_KEY;

const USER_KEY = process.env.NOWLI_USER_KEY;

export const initial: User = {
  id: "",
  email: "",
  full_name: "",
  is_admin: false,
  hashed_password: "",
  is_active: false,
  user_role: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState: getLocalStorage(USER_KEY!)
    ? getLocalStorage(USER_KEY!)
    : initial,
  reducers: {
    createUser: (state, action) => {
      console.log(action.payload.access_token, "PAYLOAD");

      if (action.payload.access_token) {
        localStorage.setItem(TOKEN_KEY ?? "token", action.payload.access_token);
      }

      persistLocalStorage<User>(USER_KEY!, action.payload.user);
      return action.payload.user;
    },
    updateUser: (state, action) => {
      const result = { ...state, ...action.payload };
      persistLocalStorage<User>(USER_KEY!, result);
      return result;
    },
    reset: () => {
      clearLocalStorage(USER_KEY!);
      return initial;
    },
  },
});

export const { createUser, updateUser, reset } = userSlice.actions;
export default userSlice.reducer;
