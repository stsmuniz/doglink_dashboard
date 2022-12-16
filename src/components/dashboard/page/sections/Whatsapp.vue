<template>
  <div class="form-floating mb-3">
    <input
        v-model="data.text"
        type="text"
        maxlength="40"
        id="external-link-text"
        class="form-control"
        placeholder="Insert the link text">
    <label for="external-link-text">Text</label>
  </div>
  <div class="form-floating mb-3">
    <vue-tel-input :mode="'international'" required v-model="data.url"/>
  </div>
</template>

<script setup lang="ts">
import { VueTelInput } from 'vue-tel-input';
import 'vue-tel-input/dist/vue-tel-input.css';
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

  if (properties.hasOwnProperty('text') && properties.hasOwnProperty('url')) {
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
