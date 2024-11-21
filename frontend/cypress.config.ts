import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners her\
    },
    baseUrl: 'http://localhost:5173',
    testIsolation: false,
  },


});