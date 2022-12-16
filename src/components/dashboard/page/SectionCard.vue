<template>
  <div class="card-body">
    <div class="form-floating mb-3" v-if="section.data.text != null">
      <input
          v-model="section.data.text"
          type="text"
          id="title"
          required
          maxlength="40"
          class="form-control">
      <label for="title">Text</label>
      <span class="text-danger" v-if="!section.data.text">Field cannot be empty</span>
    </div>
    <div class="form-floating mb-3" v-if="section.data.url != null">
      <input
          v-model="section.data.url"
          type="url"
          id="url"
          required
          class="form-control">
      <label for="url">URL</label>
      <span class="text-danger" v-if="!section.data.url">Field cannot be empty</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import {usePageStore} from "@/stores/page";

const props = defineProps({
  section: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['deleteSection'])

const store = usePageStore();

const deleteSection = (id: number) => {
  store.deleteSection(id)
      .then(() => emit('deleteSection'))
}
</script>

<style scoped>

</style>
