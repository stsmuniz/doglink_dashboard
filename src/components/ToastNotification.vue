<template>
  <div class="toast align-items-center border-0 m-2 top-0 end-0"
       :class="[{show: showToast}, `text-bg-${props.notificationType}`]"
       role="alert"
       aria-live="assertive"
       aria-atomic="true">
    <div class="d-flex">
      <div class="toast-body">
        {{text}}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  notificationType: {
    type: String,
    required: false,
    default: 'primary'
  },
  text: {
    type: String,
    required: false,
    default: ''
  },
  showToast: {
    type: Boolean,
    required: false,
    default: false
  }
})
</script>

<style scoped lang="scss">

</style>
