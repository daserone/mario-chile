import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
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
    ],
  },
});
