<template>
  <div class="min-h-screen bg-black">
    <NavBarComponent />

    <div class="min-h-screen flex items-center justify-center bg-black">
      <div
        class="w-full max-w-md bg-gray-900 p-8 rounded-2xl border border-gray-700 relative"
      >
        <h2 class="text-3xl font-bold text-white text-center">Join Now</h2>
        <p class="text-gray-400 text-center mb-6">
          Sign up to start shortening links.
        </p>

        <form class="space-y-6">
          <div class="relative">
            <input
              type="email"
              placeholder="Email address"
              class="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div class="absolute top-3 right-4 text-gray-500">📧</div>
          </div>

          <div class="relative">
            <input
              type="password"
              placeholder="Password"
              class="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div class="absolute top-3 right-4 text-gray-500">🔒</div>
          </div>

          <button
            class="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-600 transition"
          >
            Get Started 🚀
          </button>

          <RouterLink to="/sign-in">
            <p class="text-center text-sm text-gray-400 my-3">
              Already a member?
              <a href="#" class="text-blue-500 hover:text-blue-400">Log in</a>
            </p>
          </RouterLink>
        </form>
      </div>
    </div>
  </div>
</template>


<script setup>
import NavBarComponent from "../components/NavBarComponent.vue";

const signUp = async () => {
  // try {
  //     const user = await Auth. (this.email, this.password);
  //     alert('Login successful');
  //     console.log(user);
  // } catch (error) {
  // console.error(error);
  //     alert(error.message);
  // }
};
</script>  