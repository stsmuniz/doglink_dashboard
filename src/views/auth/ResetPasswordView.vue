<template>
  <div class="toast-container position-absolute end-0 top-0">
    <ToastNotification
        :notification-type="notificationType"
        :text="notificationMessage"
        :show-toast="showNotification"
      />
  </div>
  <div class="reset-form">
    <div class="card">
      <div class="card-body">
        <form @submit.prevent="login">
          <div class="form-floating mb-3">
            <input
                v-model="form.email"
                type="email"
                id="email"
                class="form-control"
                :disabled="disableForm"
                placeholder="Email">
            <label for="email">Email</label>
          </div>
          <div class="form-floating mb-3">
            <input
                v-model="form.password"
                type="password"
                id="password"
                class="form-control"
                :disabled="disableForm"
                placeholder="New Password">
            <label for="password">New Password</label>
          </div>
          <div class="form-floating mb-3">
            <input
                v-model="form.password_confirmation"
                type="password"
                id="password"
                class="form-control"
                :disabled="disableForm"
                placeholder="Repeat new password">
            <label for="password">Repeat new password</label>
          </div>
          <div class="d-grid gap-2">
            <button type="submit" class="btn btn-primary" :disabled="!allowSubmit">Reset Password</button>
            <span class="text-center">or</span>
            <router-link to="/login" class="btn btn-link">Login</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useAuthStore} from "@/stores/auth";
import {computed, ref} from "vue";
import ToastNotification from "@/components/ToastNotification.vue";
import {useRoute} from "vue-router";

const store = useAuthStore()
const route = useRoute()

const disableForm = ref(false);

const form = ref({
  email: '',
  password: '',
  password_confirmation: '',
  token: route.query.token,

});

const allowSubmit = computed(() => form.value.password && form.value.password_confirmation && form.value.email)

const notificationMessage = ref('');
const notificationType = ref('success')
const showNotification = ref(false)

const callNotification = (type: string, message: string) => {
  notificationType.value = type
  notificationMessage.value = message
  showNotification.value = true
  setTimeout(() => showNotification.value = false, 3000)
}

const login = () => {
  disableForm.value = true
  store.resetPassword(form.value)
      .then(() => callNotification('success', 'Password was reset'))
      .catch((res) => {
        callNotification('danger', 'Unable to reset password')
      }).then(() => disableForm.value = false)
}
</script>

<style scoped lang="scss">
.reset-form {
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .card {
    width: 80%;
    @media screen and (min-width: 960px){
      width: 30%;
    }
  }
}
</style>
