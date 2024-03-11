import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { createUser, reset } from "@src/state/slice/user";
const TOKEN_KEY = import.meta.env.TOKEN_KEY;
export default function useAuth() {
  const dispatch = useDispatch();

  const saveUser = useCallback(
    (item: unknown) => {
      // doLogin
      dispatch(createUser(item));
    },
    [dispatch]
  );

  const logout = useCallback(() => {
    dispatch(reset());
    localStorage.removeItem(TOKEN_KEY);
    // doLogout
  }, [dispatch]);

  return {
    saveUser,
    logout,
  };
}
