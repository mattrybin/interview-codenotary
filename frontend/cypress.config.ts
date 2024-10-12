import { defineConfig } from "cypress"
import { defineConfig as defindViteConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  fileServerFolder: ".",
  fixturesFolder: "./cypress/fixtures",
  chromeWebSecurity: false,
  viewportWidth: 1280,
  viewportHeight: 720,
  pageLoadTimeout: 60000,
  experimentalInteractiveRunEvents: true,

  retries: {
    runMode: 1,
    openMode: 1
  },

  e2e: {
    specPattern: "app/**/*.e2e.ts",
    baseUrl: "http://localhost:3000"
  },

  component: {
    specPattern: "app/**/*.cy.{ts,tsx}",
    devServer: {
      framework: "react",
      bundler: "vite",
      viteConfig: defindViteConfig({
        plugins: [react()]
      })
    }
  }
})
