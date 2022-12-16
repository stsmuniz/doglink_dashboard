<template>
  <div class="card-body">
    <i class="fa-solid fa-grip p-2 mt-1"></i>
    <div class="input-group">
            <span class="input-group-text">
              <i class="fa-brands" :class="`fa-${social.network.toLowerCase()}`"></i>
            </span>
      <input
          v-model="social.url"
          type="url"
          :id="`social-network-${social.id}`"
          class="form-control"
          placeholder="Enter social network url">
    </div>
    <span class="btn btn-light delete-item" @click.prevent="deleteSocialNetwork(social.id)">
      <i class="fa fa-trash-alt"></i>
    </span>
  </div>
</template>

<script setup lang="ts">
import {usePageStore} from "@/stores/page";

const props = defineProps({
  social: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['deleteSocialNetwork'])

const store = usePageStore();

const deleteSocialNetwork = (id: number) => {
  store.deleteSocialNetwork(id)
      .then(() => emit('deleteSocialNetwork'))
}
</script>

<style scoped lang="scss">
.card-body {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
}
</style>
