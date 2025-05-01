<script setup>
import { onMounted, inject, ref } from "vue";
import AuthAPI from "@/api/AuthAPI";
import { useRoute, useRouter } from "vue-router";

const toast = inject("toast");

const route = useRoute();
const router = useRouter();
const { token } = route.params;

const validToken = ref(false);
const errorMessage = ref("");

onMounted(async () => {
  try {
    const { data } = await AuthAPI.verifyPasswordResetToken(token);
    validToken.value = true;
  } catch (error) {
    errorMessage.value = error.response.data.msg;
    toast.open({
      message: error.response.data.msg,
      type: "error",
    });
  }
});

const handleSubmit = async ({ password }) => {
  try {
    const { data } = await AuthAPI.updatePassword(token, { password });
    toast.open({
      message: data.msg,
      type: "success",
    });
    setTimeout(() => {
      router.push({ name: "login" });
    }, 2000);
  } catch (error) {
    toast.open({
      message: error.response.data.msg,
      type: "error",
    });
  }
};
</script>

<template>
  <div v-if="validToken">
    <h1 class="text-6xl font-extrabold text-white text-center mt-10">
      Set a New Password
    </h1>
    <p class="text-2xl text-white text-center my-5">
      Please enter your new password below
    </p>
    <FormKit
      id="newPasswordForm"
      type="form"
      :actions="false"
      incomplete-message="Please complete all required fields before submitting."
      @submit="handleSubmit"
    >
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

      <FormKit type="submit">Save Password</FormKit>
    </FormKit>
  </div>
  <p v-else class="text-center text-2xl font-black text-white">
    {{ errorMessage }}
  </p>
</template>
