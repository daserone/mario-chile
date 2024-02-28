import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { createUser, reset } from "@src/state/slice/user";
import { user } from "@src/models";

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
    // doLogout
  }, [dispatch]);

  return {
    saveUser,
    logout,
  };
}
