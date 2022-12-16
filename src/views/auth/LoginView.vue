<template>
  <div class="toast-container position-absolute end-0 top-0">
    <ToastNotification
        :notification-type="notificationType"
        :text="notificationMessage"
        :show-toast="showNotification"
    />
  </div>
  <div class="login-form">
    <div class="card">
      <div class="card-body">
        <form @submit.prevent="login">
          <div class="form-floating mb-3">
            <input
                v-model="email"
                type="email"
                id="email"
                class="form-control"
                :disabled="disableForm"
                placeholder="name@email.com">
            <label for="email">Email</label>
          </div>
          <div class="form-floating mb-3">
            <input
                v-model="password"
                type="password"
                id="password"
                class="form-control"
                :disabled="disableForm"
                placeholder="insert password">
            <label for="password">password</label>
          </div>
          <div class="d-grid gap-2">
            <button
                type="submit"
                class="btn btn-primary"
                :disabled="!allowSubmit">
              Login
            </button>
            <router-link
                to="register"
                class="btn btn-link">
              Register
            </router-link>
            <router-link
                to="forgot-password"
                class="btn btn-link">
              Forgot Password
            </router-link>
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

const notificationMessage = ref(null);
const notificationType = ref('success')
const showNotification = ref(false)

const store = useAuthStore()

const disableForm = ref(false);

const email = ref();
const password = ref()

const allowSubmit = computed(() => email.value && password.value)

const callNotification = (type, message) => {
  notificationType.value = type
  notificationMessage.value = message
  showNotification.value = true
  setTimeout(() => showNotification.value = false, 3000)
}

const login = () => {
  disableForm.value = true
  store.login(email.value, password.value)
      .catch((res) => {
        console.log(res)
        callNotification('danger', 'Unable to login. Check the data and try again later')
        store.destroySession()
        disableForm.value = false
      })
}
</script>

<style scoped lang="scss">
.login-form {
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
