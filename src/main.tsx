import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
//Store
import store from "@src/state/store.ts";
//Component root
import App from "./App.tsx";
//Component
import { FallbackSpinner } from "./@core/component/spinner";
//Core styles
import "./@core/assets/fonts/feather/iconfont.css";
import "./@core/scss/core.scss";
import "./assets/scss/style.scss";
//React Hot Toast Styles
import "@styles/react/libs/react-hot-toasts/react-hot-toasts.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense fallback={<FallbackSpinner />}>
      <Provider store={store}>
        <App />
      </Provider>
    </Suspense>
  </React.StrictMode>
);
