<template>
  <div class="form-floating mb-3">
    <input
        v-model="data.url"
        type="url"
        id="spotify-player-url"
        class="form-control"
        required
        placeholder="Insert your network Url">
    <label for="spotify-player-url">URL</label>
  </div>
</template>

<script setup lang="ts">
import {onMounted, watch} from "vue";
import removeJsonNullProperties from "@/helpers/removeJsonNullProperties";

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});

watch(props.data, (newValue: any) => {
  const properties = removeJsonNullProperties(newValue);

  if (properties.hasOwnProperty('url')) {
    emit('enableSubmit');
  } else {
    emit('disableSubmit');
  }
})

onMounted(() => emit('disableSubmit'));

const emit = defineEmits(['enableSubmit', 'disableSubmit']);

</script>

<style scoped>

</style>
