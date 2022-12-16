<template>
  <nav class="navbar navbar-expand-lg bg-light mb-3">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Dog<span class="btn-link text-primary">Link</span></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link
                :to="'dashboard'"
                class="nav-link">
              Dashboard
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
                :to="'profile'"
                class="nav-link">
              Profile
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
                :to="'page'"
                class="nav-link">
              Page
            </router-link>
          </li>
        </ul>
        <ul class="navbar-nav mb-2 mb-lg-0">
          <li class="nav-item">
            <a
                href="#"
                @click="logout"
                :to="'dashboard'"
                class="nav-link">
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import {RouterLink} from "vue-router";
import {useAuthStore} from "@/stores/auth";
const auth = useAuthStore()

const logout = () => auth.logout()

</script>

<style scoped>

</style>
