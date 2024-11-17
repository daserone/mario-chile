import { lazy } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
//Component
import { WrapperVerticalLayout } from "@core/component/layouts";
//Routes
import { AuthGuard } from "./authGuard.tsx";

import Home from "@src/pages/home/Home.tsx";
import Products from "@src/pages/products/Products.tsx";
import Orders from "@src/pages/orders/Orders.tsx";
import ProductDetail from "@src/pages/products/ProductDetail.tsx";
import Trackings from "@src/pages/tracking/Tracking.tsx";
//Page
const Usuarios = lazy(() => import("../pages/usuarios/usuarios"));
const Login = lazy(() => import("../pages/login/login.tsx"));

function Routers() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="login" element={<Login />} />
          <Route element={<AuthGuard />}>
            <Route element={<WrapperVerticalLayout />}>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="home" element={<Home />} />
              <Route path="orders" element={<Orders />} />
              <Route path="trackings" element={<Trackings />} />
              <Route path="usuarios" element={<Usuarios />} />
              <Route path="products" element={<Products />} />
              <Route path="products/:name" element={<ProductDetail />} />
              <Route path="*" element={<div>Ruta no encontrada</div>} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Routers;
