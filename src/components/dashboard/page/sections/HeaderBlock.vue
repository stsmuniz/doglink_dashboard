<template>
  <div class="form-floating mb-3">
    <input
        v-model="data.text"
        type="text"
        maxlength="40"
        id="header-block-text"
        class="form-control"
        required
        placeholder="Insert the text">
    <label for="header-block-text">Text</label>
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

  if (properties.hasOwnProperty('text')) {
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
