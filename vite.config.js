import { defineConfig } from "vite";
export default defineConfig({
  base: "/",
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        register: "signUp.html",
        login: "signIn.html",
        events: "events.html",
        favorites: "favorites.html",
        basket: "basket.html",
        details: "details.html",
        user: "user.html",
        adminEvents: "admin-events.html",
        adminTickets: "admin-tickets.html",
        adminUsers: "admin-users.html",
      },
    },
  },
});
