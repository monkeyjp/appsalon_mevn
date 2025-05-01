<script setup>
import AuthAPI from "@/api/AuthAPI";
import { inject } from "vue";
import { reset } from "@formkit/core";

const toast = inject("toast");

const handleSubmit = async ({ email }) => {
  try {
    const { data } = await AuthAPI.forgotPassword({ email });
    toast.open({
      message: data.msg,
      type: "success",
    });
    reset("forgotPassword");
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
    Forgot My Password
  </h1>
  <p class="text-2xl text-white text-center my-5">
    Recover access to your account
  </p>
  <FormKit
    id="forgotPassword"
    type="form"
    :actions="false"
    incomplete-message="Please complete all required fields before submitting."
    @submit="handleSubmit"
  >
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

    <FormKit type="submit">Send Instructions</FormKit>
  </FormKit>
</template>
