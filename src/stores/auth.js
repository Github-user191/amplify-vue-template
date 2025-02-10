import { defineStore } from "pinia";
import { getCurrentUser } from "@aws-amplify/auth";
import { Hub } from "@aws-amplify/core";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null, // Holds the authenticated user
    isLoading: false, // Tracks loading state
  }),

  getters: {
    isAuthenticated() {
        return getCurrentUser() != null
    },

    async getUserDetails() {
        return await getCurrentUser();
    }
  },

  actions: {
    // ✅ Check if user is authenticated
    async checkAuth() {
      this.isLoading = true;
      try {
        this.user = await getCurrentUser();
        console.log("User is logged in:", this.user);
      } catch (error) {
        console.log("No user logged in");
        this.user = null;
      }

      console.log(this.user)
      this.isLoading = false;
    },

    // ✅ Sign In User
    async signIn(email, password) {
      this.isLoading = true;
      try {
        const user = await signIn(email, password);
        this.user = user;
        console.log("Login successful:", user);
      } catch (error) {
        console.error("Login error:", error.message);
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    // ✅ Sign Out User
    async signOut() {
        alert("dd")
      this.isLoading = true;
      try {
        await signOut();
        this.user = null;
        console.log("User signed out");
      } catch (error) {
        console.error("Sign out error:", error.message);
      } finally {
        this.isLoading = false;
      }
    },

    // ✅ Set up a listener for authentication state changes
    listenForAuthChanges() {
      Hub.listen("auth", ({ payload }) => {
        console.log("LISTEN AUTH CHANGE ", payload)
        switch (payload.event) {
          case "signIn":
            this.checkAuth(); // Update user state on sign-in
            break;
          case "signOut":
            this.user = null; // Reset user state on sign-out
            break;
        }
      });
    },
  },
});
