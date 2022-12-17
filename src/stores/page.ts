import {createPinia, defineStore} from "pinia";
import http, {setBearerToken} from "@/http/api";
import {createApp} from "vue";
import App from "@/App.vue";
import {useAuthStore} from "@/stores/auth";
import type {iPage} from "@/interfaces/iPage";
import removeJsonNullProperties from "@/helpers/removeJsonNullProperties";

const pinia = createPinia();
const app = createApp(App)
app.use(pinia)

const authStore = useAuthStore();

const setToken = () => {
    const token = authStore.token ? authStore.token : localStorage.getItem('accessToken')
    setBearerToken(token)
}
export const usePageStore = defineStore('page', {
    state: () => ({
        page: {}
    }),
    getters: {
        getPage: (state) => state.page.data ? stage.page.data : state.page,
        getUrl: (state) => `https://doglink.net/${state.page.custom_url}`,
    },
    actions: {
        getUserPage() {
            setToken()
            return http.get('/api/pages')
                .then(res => {
                    this.page = res.data.data[0]
                })
        },
        updatePage(data: iPage) {
            setToken()
            http.put(`/api/pages/${data.id}`, data)
                .then(res => this.page = res.data.data)
                .catch(err => console.log(err))
        },
        deleteSocialNetwork(id: number) {
            setToken()
            return http.delete(`/api/pages/${this.page.id}/social-networks/${id}`)
                .then(() => {
                    const filteredSocialNetworks = this.page.social_networks.filter(item => item.id !== id)
                    this.page.social_networks = filteredSocialNetworks
                })
        },
        addSocialNetwork(data) {
            setToken()
            return http.post(`/api/pages/${this.page.id}/social-networks/`, {
                type: data.value.network,
                order: data.value.order,
                url: data.value.url
            }).then((res) => {
                const network = res.data.data;
                this.page.social_networks.push(network)
                console.log('success')
            })
        },
        deleteSection(id: number) {
            setToken()
            return http.delete(`/api/pages/${this.page.id}/sections/${id}`)
                .then(() => {
                    const sections = this.page.sections.filter(item => item.id !== id)
                    this.page.sections = sections
                })
        },
        addSection(data) {
            setToken()
            const sectionData = removeJsonNullProperties(data.data)

            return http.post(`/api/pages/${this.page.id}/sections/`, {
                type: data.type,
                order: data.order,
                data: JSON.stringify(sectionData)
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
        },
    }
})
