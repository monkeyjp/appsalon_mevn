<script setup>
import { inject } from "vue";
import { reset } from "@formkit/vue";
import AuthAPI from "@/api/AuthAPI";
import { useRouter } from "vue-router";

const toast = inject("toast");
const router = useRouter();

const handleSubmit = async (formData) => {
  try {
    const {
      data: { token },
    } = await AuthAPI.login(formData);
    localStorage.setItem("AUTH_TOKEN", token);
    router.push({ name: "my-appointments" });
  } catch (error) {
    toast.open({
      message: error.response.data.msg,
      type: "error",
    });
  }
};
</script>

<template>
  <h1 class="text-6xl font-extrabold text-white text-center mt-10">
    Inicia Sesión
  </h1>
  <p class="text-2xl text-white text-center my-5">
    Si tienes una cuenta, inicia sesión
  </p>

  <FormKit
    id="loginForm"
    type="form"
    :actions="false"
    incomplete-message="Please complete all required fields before submitting."
    @submit="handleSubmit"
  >
    <FormKit
      type="email"
      label="Email"
      name="email"
      placeholder="User Email"
      validation="required|email"
      :validation-messages="{
        required: 'Email is required.',
        email: 'Please enter a valid email address.',
      }"
    />
    <FormKit
      type="password"
      label="Password"
      name="password"
      placeholder="Password"
      validation="required"
      :validation-messages="{
        required: 'Password is required.',
      }"
    />

    <FormKit type="submit">Login</FormKit>
  </FormKit>
</template>
