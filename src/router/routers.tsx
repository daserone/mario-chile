import { lazy } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
//Component
import { WrapperVerticalLayout } from "@core/component/layouts";
//Routes
import { AuthGuard } from "./authGuard.tsx";
import Pacientes from "@src/pages/bieni-wallet/pacientes/Pacientes.tsx";
import PacienteDetail from "@src/pages/bieni-wallet/paciente-detail/PacienteDetail.tsx";
import Difusion from "@src/pages/bieni-wallet/disusion/Difusion.tsx";
import Clientes from "@src/pages/bieni-medico/clientes/Clientes.tsx";
import Planes from "@src/pages/bieni-medico/planes/Planes.tsx";
import Integraciones from "@src/pages/bieni-medico/integraciones/Integraciones.tsx";
import DifusionDetail from "@src/pages/bieni-wallet/difusion-detail/DifusionDetail.tsx";
//Page
const Usuarios = lazy(() => import("../pages/usuarios/usuarios"));
const Login = lazy(() => import("../pages/login/login.tsx"));
const Validacion = lazy(
  () => import("../pages/bieni-wallet/validaciones/validaciones.tsx")
);

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
              <Route path="bieni-wallet/pacientes" element={<Pacientes />} />
              <Route
                path="bieni-wallet/paciente/:id"
                element={<PacienteDetail />}
              />
              <Route path="bieni-wallet/validacion" element={<Validacion />} />
              <Route path="bieni-wallet/difusion" element={<Difusion />} />
              <Route
                path="bieni-wallet/difusion/:id"
                element={<DifusionDetail />}
              />
              <Route path="bieni-medico/clientes" element={<Clientes />} />
              <Route path="bieni-medico/planes" element={<Planes />} />
              <Route
                path="bieni-medico/integraciones"
                element={<Integraciones />}
              />
              <Route path="*" element={<div>Ruta no encontrada</div>} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Routers;
