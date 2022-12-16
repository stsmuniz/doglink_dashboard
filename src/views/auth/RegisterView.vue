<template>

  <div class="register-form">
    <div class="card">
      <div class="card-body">
        <form @submit.prevent="register">
          <div class="form-floating mb-3">
            <input
                v-model="name"
                type="text"
                id="name"
                class="form-control"
                placeholder="name@email.com">
            <label for="name">Name</label>
            <div v-if="store.getErrors.name" class="text-danger mt-0">
              {{store.getErrors.name[0]}}
            </div>
          </div>
          <div class="form-floating mb-3">
            <input
                v-model="email"
                type="email"
                id="email"
                class="form-control"
                placeholder="name@email.com">
            <label for="email">Email</label>
            <div v-if="store.getErrors.email" class="text-danger mt-0">
              {{store.getErrors.email[0]}}
            </div>
          </div>
          <div class="form-floating mb-3">
            <input
                v-model="password"
                type="password"
                id="password"
                class="form-control"
                placeholder="insert password">
            <label for="password">password</label>
            <div v-if="store.getErrors.password" class="text-danger mt-0">
              {{store.getErrors.password[0]}}
            </div>
          </div>
          <div class="form-floating mb-3">
            <input
                v-model="c_password"
                type="password"
                id="c_password"
                class="form-control"
                placeholder="insert password">
            <label for="c_password">confirm password</label>
            <div v-if="store.getErrors.c_password" class="text-danger mt-0">
              {{store.getErrors.c_password[0]}}
            </div>
          </div>
          <div class="d-grid gap-2">
            <button type="submit" class="btn btn-primary" :disabled="!allowSubmit">Register</button>
            <span class="text-center">or</span>
            <router-link to="login" class="btn btn-link">Login</router-link>
          </div>
        </form>
      </div>
    </div>
  </div></template>

<script setup lang="ts">
import {useAuthStore} from "@/stores/auth";
import {computed, onMounted, ref} from "vue";

const store = useAuthStore()

onMounted(() => {
  store.authErrors = []
})

const name = ref();
const email = ref();
const password = ref()
const c_password = ref()

const allowSubmit = computed(() => name.value && email.value && password.value && c_password.value)

const register = () => store.register(
    name.value,
    email.value,
    password.value,
    c_password.value
)
</script>

<style scoped lang="scss">
.register-form {
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
