import { lazy } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
//Component
import { WrapperVerticalLayout } from "@core/component/layouts";
//Routes
import { AuthGuard } from "./authGuard.tsx";
//Page
const Usuarios = lazy(() => import("../pages/usuarios/usuarios"));
const Login = lazy(() => import("../pages/login/login.tsx"));

function Routers() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="usuarios" />} />
          <Route path="login" element={<Login />} />
          <Route element={<AuthGuard />}>
            <Route element={<WrapperVerticalLayout />}>
              <Route path="/" element={<Navigate to="/usuarios" />} />
              <Route path="usuarios" element={<Usuarios />} />
              <Route path="*" element={<div>Ruta no encontrada</div>} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Routers;
