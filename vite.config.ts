import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "BIENI_");

  const processEnvValues = {
    "process.env": Object.entries(env).reduce((prev, [key, val]) => {
      return {
        ...prev,
        [key]: val,
      };
    }, {}),
  };

  return {
    plugins: [react()],
    resolve: {
      alias: [
        {
          find: "@src",
          replacement: path.resolve(path.join(__dirname, "/src")),
        },
        {
          find: "@core",
          replacement: path.resolve(path.join(__dirname, "/src/@core")),
        },
        {
          find: "@styles",
          replacement: path.resolve(path.join(__dirname, "/src/@core/scss")),
        },
        {
          find: "@store",
          replacement: path.resolve(path.join(__dirname, "/src/state")),
        },
        {
          find: "@configs",
          replacement: path.resolve(path.join(__dirname, "/src/config")),
        },
        {
          find: "@hooks",
          replacement: path.resolve(path.join(__dirname, "/src/hooks")),
        },
        {
          find: "@component",
          replacement: path.resolve(path.join(__dirname, "/src/component")),
        },
        {
          find: "@assets",
          replacement: path.resolve(path.join(__dirname, "/src/assets")),
        },
        {
          find: "@services",
          replacement: path.resolve(path.join(__dirname, "/src/services")),
        },
        {
          find: "@models",
          replacement: path.resolve(path.join(__dirname, "/src/models")),
        },
      ],
    },
    define: processEnvValues,
  };
});
