import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? "/tge-mint-page/" : "/",
  plugins: [react(), tsconfigPaths()],
});
