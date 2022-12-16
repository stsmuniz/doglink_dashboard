<template>
  <div class="preview">
    <iframe
        id="page-preview"
        target="_blank" :src="url"></iframe>
  </div>
</template>

<script setup lang="ts">
import {usePageStore} from "@/stores/page";
import {computed, onMounted} from "vue";

const previewPageStore = usePageStore()

onMounted(() => previewPageStore.getUserPage())

const url = computed(() => previewPageStore.getUrl)
</script>

<style scoped lang="scss">
.preview {
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  #page-preview {
    width: 100%;
    height: 100%;
  }
}
@media screen  and (min-width: 992px){
  .preview {
    padding-top: 0px;
    position: relative;
    #page-preview {
      position: fixed;
      border-radius: 2rem;
      border: 1rem solid black;
      width: 24rem;
      height: 36rem;
    }
  }
}

</style>
