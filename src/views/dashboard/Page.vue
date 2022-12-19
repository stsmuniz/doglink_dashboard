<template>
  <nav-menu></nav-menu>
  <div class="container-fluid" :class="{'overflow-hidden': showPreview}">
    <div class="row">
      <div class="col-12 col-lg-8">
        <div class="page-form">
          <form v-if="page" @blur="update">
            <div class="card">
              <div class="card-header">
                <div class="card-header-title">
                  General
                </div>
              </div>
              <div class="card-body">
                <div class="form-floating mb-3">
                  <div class="row">
                    <div class="col">
                      <label for="primary_color">Primary Color</label>
                      <input
                          v-model="page.primary_color"
                          type="color"
                          id="primary_color"
                          class="form-control form-control-color"
                          placeholder="#000000">
                    </div>
                    <div class="col">
                      <label for="secondary_color">Secondary Color</label>
                      <input
                          v-model="page.secondary_color"
                          type="color"
                          id="secondary_color"
                          class="form-control form-control-color"
                          placeholder="#000000">
                    </div>
                    <div class="col">
                      <label for="background_color">Background Color</label>
                      <input
                          v-model="page.background_color"
                          type="color"
                          id="background_color"
                          class="form-control form-control-color"
                          placeholder="#000000">
                    </div>
                    <div class="col">
                      <label for="text_color">Text Color</label>
                      <input
                          v-model="page.text_color"
                          type="color"
                          id="text_color"
                          class="form-control form-control-color"
                          placeholder="#000000">
                    </div>
                  </div>
                </div>
                <div class="form-floating mb-3">
                  <input
                      v-model="page.title"
                      type="text"
                      id="title"
                      class="form-control"
                      placeholder="Insert your page title">
                  <label for="title">Title</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                      v-model="page.tagline"
                      type="text"
                      id="tagline"
                      class="form-control"
                      placeholder="Insert your tagline">
                  <label for="tagline">Tagline</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                      v-model="page.custom_url"
                      type="text"
                      id="custom_url"
                      class="form-control"
                      placeholder="Insert your custom url">
                  <label for="custom_url">Custom URL</label>
                  <span>Your page url: <a :href="store.getUrl" target="_blank">{{store.getUrl}}</a> </span>
                </div>
              </div>
            </div>
            <div class="card social-network-container mt-3">
              <div class="card-header">
                <div class="card-header-title">Social Networks</div>
                <button class="btn btn-light"
                        data-bs-toggle="modal"
                        data-bs-target="#add-modal"
                        @click.prevent="setModalContent('social')">
                  <i class="fa-solid fa-plus"></i>
                </button>
              </div>
              <div class="card-body">
                <vue-draggable-next class="dragArea list-group" :list="page.social_networks">
                  <div
                      class="mb-3 card"
                      v-for="(social, index) in page.social_networks"
                      :key="social.id"
                      draggable="true"
                  >
                    <social-network-card :social="social" @deleteSocialNetwork="loadPage"/>
                  </div>
                </vue-draggable-next>
              </div>
            </div>
            <div class="sections card mt-3">
              <div class="card-header">
                <div class="card-header-title">
                  Sections
                </div>
                <button class="btn btn-light"
                        data-bs-toggle="modal"
                        data-bs-target="#add-modal"
                        @click.prevent="setModalContent('section')">
                  <i class="fa-solid fa-plus"></i>
                </button>
              </div>
              <div class="card-body">
                <vue-draggable-next class="dragArea list-group" :list="page.sections">
                  <div class="section" v-for="section in page.sections" :key="section.id">
                    <div class="card mb-3" draggable="true">
                      <div class="card-header">
                        <i class="fa-solid fa-grip p-2 mt-1"></i>

                        <div class="card-header-title">
                          {{ Sections[section.type as keyof typeof Sections] }}
                        </div>
                        <span class="btn btn-light delete-item" @click="deleteSection(section.id)">
                          <i class="fa fa-trash-alt"></i>
                        </span>
                      </div>
                      <section-card :section="section"/>
                    </div>
                  </div>
                </vue-draggable-next>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="col-12 col-lg-4 preview-container" :class="{show: showPreview}">
        <PagePreview :class="{'d-none': !showPreview}" class="d-lg-block"/>
        <div class="button-container d-block d-lg-none">
          <button
              class="btn btn-secondary"
              @click="togglePreview">
            <i class="fa-solid fa-mobile-screen"></i> <span v-if="showPreview">Close</span> Preview
          </button>
        </div>
      </div>
    </div>
  </div>
  <ModalComponent :id="'add-modal'">
    <add-social-network-form v-if="modalContent === 'social'" @addSocialNetwork="loadPage" />
    <add-section-form v-if="modalContent === 'section'" @addSection="loadPage" />
  </ModalComponent>
</template>

<script setup lang="ts">
import {usePageStore} from "@/stores/page";
import {onMounted, ref, watch} from "vue";
import Sections from "@/enums/Sections";
import debounce from '@/helpers/debounce'
import {VueDraggableNext} from "vue-draggable-next";
import NavMenu from "@/components/dashboard/NavMenu.vue";
import PagePreview from "@/components/dashboard/PagePreview.vue";
import SectionCard from "@/components/dashboard/page/SectionCard.vue";
import AddSectionForm from "@/components/dashboard/page/AddSectionForm.vue";
import SocialNetworkCard from "@/components/dashboard/page/SocialNetworkCard.vue";
import AddSocialNetworkForm from "@/components/dashboard/page/AddSocialNetworkForm.vue";
import ModalComponent from "@/components/ModalComponent.vue";
import sectionsHasNullItems from "@/helpers/sectionsHasNullItems";
import type {iSection} from "@/interfaces/iSection";

const store = usePageStore();
const page = ref();
const loadPage = () => store.getUserPage().then(() => page.value = store.getPage);

const windowWidth = ref()

const showPreview = ref(false);

onMounted(() => {
  loadPage()
  windowWidth.value = window.innerWidth
  if (windowWidth.value > 992) {
    showPreview.value = true
  }
});
const modalContent = ref();

const setModalContent = (formType: string) => modalContent.value = formType

watch(() => page, debounce(async (newValue: any) => {
          await update(newValue.value)
          if (!sectionsHasNullItems(newValue.value.sections)) {
            // @ts-ignore
            setTimeout(() => document.getElementById('page-preview').src += '', 500)
          }
        },
        500
    ),
    {deep: true}
)

const update = (value: any) => {
  if (!sectionsHasNullItems(value.sections)){
    store.updatePage(value)
  }
}

const deleteSection = (id: number) => {
  store.deleteSection(id)
      .then(page.value.sections = page.value.sections.filter((item: iSection) => item.id !== id))
}

const togglePreview = () => {
  showPreview.value = !showPreview.value
}

</script>

<style scoped lang="scss">
@import "@/assets/main.css";
.preview-container {
  position: fixed;
  display: block;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  transition: display 1s ease-in-out;
  &.show {
    width: 100vw;
    height: 100vh;
  }
  margin-left: -0.5rem;
  @media screen and (min-width: 992px) {
    position: relative;
    width: 33.33%;
    margin-left: 0;
    &.show {
      width: 33.33%;
      height: initial;
    }
  }
  .button-container {
    padding-right: 2rem;
    position: fixed;
    text-align: center;
    bottom: 1rem;
    width: 100%;
    button {
      border-radius: 10rem;
    }
  }
}
.card-header {
  .card-header-title {
    line-height: 2.5rem;
  }
}

.delete-item {
  cursor: pointer;
}

.fa-grip {
  cursor: grab;
}

.card-header {
  display: flex;
  flex-direction: row;
  .card-header-title {
    flex-grow: 1;
  }
}
</style>
