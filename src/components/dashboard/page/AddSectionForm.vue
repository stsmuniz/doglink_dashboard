<template>
  <form class="add-section-form" @submit.prevent="addSection">
    <div class="modal-body">
      <div class="form-floating mb-3">
        <div class="dropdown">
          <button
              class="btn btn-light dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false">
            <span v-if="!newSection.type">Choose Section</span>
            <span v-else>{{Sections[newSection.type]}}</span>
          </button>
          <ul class="dropdown-menu">
            <li v-for="(section, index) in Sections" class="dropdown-item"
                @click="changeSectionType(index)">
              {{section}}
            </li>
          </ul>
        </div>
      </div>
      <component
          :is="mapTypeComponents[componentTypeSection]"
          :data="newSection.data"
          @enableSubmit="setSubmit(true)"
          @disableSubmit="setSubmit(false)"
      />
    </div>
    <div class="modal-footer">
      <button
          type="submit"
          class="btn btn-primary"
          :disabled="disableForm">Save</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import type {Ref} from "vue";
import {usePageStore} from "@/stores/page";
import type {iSection} from "@/interfaces/iSection";
import Sections from "@/enums/Sections";

import YoutubePlayer from "@/components/dashboard/page/sections/YoutubePlayer.vue";
import ExternalLink from "@/components/dashboard/page/sections/ExternalLink.vue";
import SpotifyPlayer from "@/components/dashboard/page/sections/SpotifyPlayer.vue";
import HeaderBlock from "@/components/dashboard/page/sections/HeaderBlock.vue";
import Whatsapp from "@/components/dashboard/page/sections/Whatsapp.vue";

const store = usePageStore();

const initialSection = {
  type: null,
  data: {url: '', text: ''},
  order: 999
}

const disableForm = ref(true);

const setSubmit = (status: boolean) => disableForm.value = !status;

const newSection: Ref<iSection> = ref(initialSection);

const componentTypeSection = computed(() => newSection.value.type?.replace(' ', ''));

const mapTypeComponents = {
  YoutubePlayer: YoutubePlayer,
  ExternalLink: ExternalLink,
  SpotifyPlayer: SpotifyPlayer,
  HeaderBlock: HeaderBlock,
  Whatsapp: Whatsapp,
}

const error = ref();

const changeSectionType = (section: Sections) => {
  newSection.value.type = section
}

const emit = defineEmits(['addSection'])

const addSection = () => {
  store.addSection(newSection.value)
      .then(() => {
        document.getElementById('close-modal').click()
        emit('addSection')
      })
      .catch(err => console.log(err))
}

const modal = document.getElementById('add-modal')
modal?.addEventListener('hidden.bs.modal', function (event) {
  newSection.value = {
    type: null,
    data: {url: '', text: ''},
    order: 999
  }
})

</script>

<style scoped>

</style>
