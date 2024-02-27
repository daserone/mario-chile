import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
//Const
import themeConfig from "./config/theme.config.ts";
//Context
import { ThemeContext } from "./state/context/ThemeColor.tsx";
// Create a client
const queryClient = new QueryClient();
//Routers
import { Routers } from "@src/router";
//Hook
//import { useLayout } from "./hooks/index.tsx";

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeContext>
          <Routers />
          <Toaster
            position={themeConfig?.layout?.toastPosition ?? "top-right"}
            toastOptions={{ className: "react-hot-toast" }}
          />
        </ThemeContext>
      </QueryClientProvider>
    </>
  );
}

export default App;
