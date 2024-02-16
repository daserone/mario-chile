import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { AppStore } from "@store/store";

export const AuthGuard = () => {
  const auth = useSelector((store: AppStore) => store.auth);

  if (!auth?.active) {
    return <Navigate replace to="/login" />;
  }

  return <Outlet />;
};

export default AuthGuard;
