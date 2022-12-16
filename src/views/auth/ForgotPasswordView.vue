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
                v-model="email"
                type="email"
                id="email"
                class="form-control"
                placeholder="name@email.com">
            <label for="email">Email</label>
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

<script setup>
import {useAuthStore} from "@/stores/auth";
import {computed, ref} from "vue";
import ToastNotification from "@/components/ToastNotification.vue";

const store = useAuthStore()

const email = ref();

const allowSubmit = computed(() => email.value)

const notificationMessage = ref(null);
const notificationType = ref('success')
const showNotification = ref(false)

const callNotification = (type, message) => {
  notificationType.value = type
  notificationMessage.value = message
  showNotification.value = true
  setTimeout(() => showNotification.value = false, 3000)
}

const login = () => {
  store.forgotPassword(email.value)
      .then(() => callNotification('success', 'Request Sent'))
      .catch((res) => {
        callNotification('danger', 'Unable to complete the request')
      })
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
