import { loadEnv } from "vite";
import { defineConfig } from "vitest/config";

export default defineConfig(({ mode }) => ({
  test: {
    env: loadEnv(mode, process.cwd(), ""),
    globalSetup: "./test/globalSetup.ts",
    testTimeout: 15_000,
  },
}));
