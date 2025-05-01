<script setup>
import { inject } from "vue";
import { reset } from "@formkit/vue";
import AuthAPI from "@/api/AuthAPI";

const toast = inject("toast");

const handleSubmit = async ({ password_confirm, ...formData }) => {
  try {
    const { data } = await AuthAPI.register(formData);
    toast.open({
      message: data.msg,
      type: "success",
    });
    reset("registerForm");
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
    Create an Account
  </h1>
  <p class="text-2xl text-white text-center my-5">
    Sign up for an account at AppSalon
  </p>

  <FormKit
    id="registerForm"
    type="form"
    :actions="false"
    incomplete-message="Please complete all required fields before submitting."
    @submit="handleSubmit"
  >
    <FormKit
      type="text"
      label="Name"
      name="name"
      placeholder="Your Name"
      validation="required|length:3"
      :validation-messages="{
        required: 'Name is required.',
        length: 'Name must be at least 3 characters long.',
      }"
    />
    <FormKit
      type="email"
      label="Email"
      name="email"
      placeholder="Your Email"
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
      placeholder="Password - at least 8 characters"
      validation="required|length:8"
      :validation-messages="{
        required: 'Password is required.',
        length: 'Password must be at least 8 characters',
      }"
    />
    <FormKit
      type="password"
      label="Repeat Password"
      name="password_confirm"
      placeholder="Repeat Password"
      validation="required|confirm"
      :validation-messages="{
        required: 'Password confirmation is required.',
        confirm: 'Passwords do not match.',
      }"
    />

    <FormKit type="submit">Create Account</FormKit>
  </FormKit>
</template>
