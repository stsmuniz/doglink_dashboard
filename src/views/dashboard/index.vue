<template>
  <NavMenu></NavMenu>
  <div class="container-fluid"><h1>Dashboard</h1></div>
</template>

<script setup lang="ts">
import {useUserStore} from "@/stores/user"
import {computed, onMounted, ref} from "vue";
import {useAuthStore} from "@/stores/auth";
import NavMenu from "@/components/dashboard/NavMenu.vue";

const store = useUserStore()
const auth = useAuthStore()
const user = ref()
onMounted(async () => {
  await store.getUserData()
  user.value = computed(() => store.$state.user)
})

</script>

<style scoped lang="scss">
@import "@/assets/main.css";

</style>
