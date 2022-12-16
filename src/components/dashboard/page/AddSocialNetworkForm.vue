<template>
  <form class="add-social-network-form">
    <div class="modal-body">
      <div class="form-floating mb-3">
        <div class="dropdown">
          <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <span v-if="!newSocialNetwork.network">Choose Network</span>
            <span v-else>
                    {{newSocialNetwork.network}}
                  </span>
          </button>
          <ul class="dropdown-menu">
            <li v-for="network in SocialNetworks" class="dropdown-item"
                @click="changeSocialNetworkType(network)">
              <i class="fa-brands"
                 :class="`fa-${network.toLowerCase()}`"></i>
              {{network}}
            </li>
          </ul>
        </div>
      </div>
      <div class="form-floating mb-3">
        <input
            v-model="newSocialNetwork.url"
            type="url"
            id="url"
            class="form-control"
            placeholder="Insert your network Url">
        <label for="tagline">URL</label>
        <span class="text-danger" v-if="errors?.url">{{errors.url[0]}}</span>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" @click="addSocialNetwork">Save</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import {ref} from "vue";
import type {Ref} from "vue";
import type {iSocialNetwork} from "@/interfaces/iSocialNetwork";
import {usePageStore} from "@/stores/page";
import SocialNetworks from "@/enums/SocialNetworks";
const store = usePageStore();

const initialSocialNetworkValue = {
  network: null,
  url: '',
  order: 999
}

const errors = ref();

const emit = defineEmits(['addSocialNetwork'])

const newSocialNetwork: Ref<iSocialNetwork> = ref(initialSocialNetworkValue);

const changeSocialNetworkType = (network: SocialNetworks) => {
  newSocialNetwork.value.network = network
}

const addSocialNetwork = () => {
  store.addSocialNetwork(newSocialNetwork)
      .then(() => {
        document.getElementById('close-modal').click()
        emit('addSocialNetwork')
      })
      .catch(res => errors.value = res.response.data.data)
}

const modal = document.getElementById('add-modal')
modal.addEventListener('hidden.bs.modal', function (event) {
  newSocialNetwork.value = {
    network: null,
    url: '',
    order: 999
  }
  errors.value = null
})

</script>

<style scoped>

</style>
