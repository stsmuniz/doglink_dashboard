<template>
  <nav-menu></nav-menu>
  <ToastNotification
      :notification-type="notificationType"
      :text="notificationMessage"
      :show-toast="showNotification"
  />
  <div class="container-fluid">
    <section id="main">
      <div class="profile-form">
        <div class="card mb-3">
          <div class="card-header">Profile Picture</div>
          <div class="card-body">
            <figure class="figure avatar-container">
              <img class="figure-img img-fluid"
                   :src="user.profile_pic ? user.profile_pic : '/src/assets/images/Portrait_Placeholder.png'"
                   alt="User profile picture">
              <figcaption class="figure-caption">Current Profile Picture</figcaption>
            </figure>
            <div class="mb-3">
              <div class="mb-3">
                <input
                    type="file"
                    id="name"
                    class="form-control d-none"
                    ref="profilePictureInput"
                    accept="image/png, image/jpeg"
                    @change="prepareUploadProfilePicture"
                    placeholder="Add or change image avatar">
              </div>
              <div class="profile-actions">
                <button
                    type="button"
                    @click="callFileInput"
                    class="btn btn-primary">
                  Change Profile Picture
                </button>
                <button
                    type="button"
                    class="btn btn-outline-primary"
                    @click="deleteProfilePicture">
                  Remove Profile Picture
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            General Info
          </div>
          <div class="card-body">
            <form @submit.prevent="updateProfile">
              <div class="form-floating mb-3">
                <input
                    v-model="user.name"
                    type="text"
                    id="name"
                    class="form-control"
                    placeholder="name@email.com">
                <label for="name">Name</label>
              </div>
              <div class="form-floating mb-3">
                <input
                    v-model="user.email"
                    type="text"
                    id="email"
                    class="form-control"
                    placeholder="name@email.com">
                <label for="email">Email</label>
              </div>
              <div class="d-grid gap-2">
                <div class="profile-actions">
                  <button type="submit" class="btn btn-primary">Update</button>
                  <button
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#delete-account-confirmation"
                      class="btn btn-outline-danger">
                    Delete Account
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
    <!--      <section id="preview" class="col-4">-->
    <!--        <page-preview/>-->
    <!--      </section>-->
  </div>
  <modal-component :id="'delete-account-confirmation'">
    <div class="modal-body">
      <h5 class="text-danger">Are you sure you want to delete your account?</h5>
      <p>This action cannot be undone</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-danger" @click="deleteProfile">Delete account</button>
      <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Cancel</button>
    </div>
  </modal-component>
  <div class="crop-modal-container" v-if="showCropModal" @click.self="showCropModal = false">
    <div class="modal-body">
      <vue-cropper
          ref="cropper"
          :src="imgSrc"
          :aspect-ratio="1"
          :view-mode="1"
          class="cropper-canvas-container"
          alt="Source Image"
      />
      <div class="crop-actions mt-3">
        <button
            role="button"
            @click.prevent="cropImage"
            class="btn btn-success"
        >Crop</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import NavMenu from "@/components/dashboard/NavMenu.vue";
import {useUserStore} from "@/stores/user";
import {computed, onMounted, ref} from "vue";
import ToastNotification from "@/components/ToastNotification.vue";
import PagePreview from "@/components/dashboard/PagePreview.vue";
import {reloadPage} from "@/helpers/debounce";
import ModalComponent from "@/components/ModalComponent.vue";
import {useAuthStore} from "@/stores/auth";

import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';

const showCropModal = ref(false)
const imgSrc = ref()
const cropper = ref()

const store = useUserStore()
const authstore = useAuthStore()

onMounted(() => store.getUserData())

const notificationMessage = ref(null);
const notificationType = ref('success')
const showNotification = ref(false)

const profilePictureInput = ref(null)
const profilePicture = ref()
const profilePicturePreview = ref()

const callFileInput = () => {
  profilePictureInput.value.click()
}

const prepareUploadProfilePicture = () => {
  profilePicture.value = profilePictureInput.value.files[0]
  profilePicturePreview.value = URL.createObjectURL(profilePicture.value)
  imgSrc.value = profilePicturePreview.value
  showCropModal.value = true
}

const deleteProfile = () => {
  store.deleteProfile()
      .then(() => {
        alert('You \'ll be redirected to the home page');
        authstore.logout();
      })

}

const deleteProfilePicture = () => {
  store.deleteProfilePicture()
      .then(() => document.getElementById('close-modal').click())
      .then(() => {
        profilePicturePreview.value = store.getUserProfilePicture
      })
  reloadPage()
}

const cropImage = () => {
  const file = ref()
  cropper.value.getCroppedCanvas().toBlob(function(blob) {
    file.value = new File([blob], `${user.value.id}.jpg,`, { type: 'image/jpeg' });
    store.updateProfilePicture(file)
    reloadPage()
    showCropModal.value = false
  }, 'image/jpeg');
}

const callNotification = (type, message) => {
  notificationType.value = type
  notificationMessage.value = message
  showNotification.value = true
  setTimeout(() => showNotification.value = false, 3000)
}

const user = computed(() => store.getUser);

const updateProfile = () => {
  store.updateProfile(user)
      .then(() => callNotification('success', 'Request Sent'))
      .catch((res) => {
        callNotification('danger', 'Unable to complete the request')
      })
}
</script>

<style scoped lang="scss">
@import "@/assets/main.css";
.avatar-container {
  max-width: 10rem;
  padding-bottom: 1rem;
}

.container-fluid {
  flex-direction: row;
  align-items: center;
  justify-content: center;
  display: flex;
  #main {
    width: 90%;
    @media screen and (min-width: 960px) {
      width: 70%;
    }
  }
}

.profile-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  @media screen and (min-width: 960px) {
    flex-direction: row;
  }
}

.crop-modal-container {
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #000000cc;
  padding: 1rem;

  .modal-body {
    padding: 1rem;
    background-color: #fff;
    border-radius: 0.5rem;
    max-height: 85vh;
    flex-grow: 0;
  }

  .cropper-canvas-container {
    max-height: 95%;
  }
}

</style>
