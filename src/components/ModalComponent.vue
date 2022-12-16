<template>
  <div class="modal fade"
       :id="id"
       tabindex="-1"
       aria-labelledby="modal-header" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button"
                  class="btn-close"
                  id="close-modal"
                  data-bs-dismiss="modal"
                  aria-label="Close"></button>
        </div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  id: {
    type: String,
    required: false,
    default: 'modal'
  }
})
</script>

<style scoped>

</style>
