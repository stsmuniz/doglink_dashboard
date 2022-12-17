import {createPinia, defineStore} from "pinia";
import http, {setBearerToken} from "@/http/api";
import {createApp} from "vue";
import App from "@/App.vue";
import {useAuthStore} from "@/stores/auth";
import type {iPage} from "@/interfaces/iPage";
import removeJsonNullProperties from "@/helpers/removeJsonNullProperties";
import type {iSection} from "@/interfaces/iSection";

const pinia = createPinia();
const app = createApp(App)
app.use(pinia)

const authStore = useAuthStore();

const setToken = () => {
    // @ts-ignore
    const token = authStore.token ? authStore.token : localStorage.getItem('accessToken')
    setBearerToken(token)
}
export const usePageStore = defineStore('page', {
    state: () => ({
        page: {}
    }),
    getters: {
        // @ts-ignore
        getPage: (state) => state.page.data ? state.page.data : state.page,
        // @ts-ignore
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
            // @ts-ignore
            return http.delete(`/api/pages/${this.page.id}/social-networks/${id}`)
                .then(() => {
                    // @ts-ignore
                    const filteredSocialNetworks = this.page.social_networks.filter(item => item.id !== id)
                    // @ts-ignore
                    this.page.social_networks = filteredSocialNetworks
                })
        },
        addSocialNetwork(data: any) {
            setToken()
            // @ts-ignore
            return http.post(`/api/pages/${this.page.id}/social-networks/`, {
                type: data.value.network,
                order: data.value.order,
                url: data.value.url
            }).then((res) => {
                const network = res.data.data;
                // @ts-ignore
                this.page.social_networks.push(network)
            })
        },
        deleteSection(id: number) {
            setToken()
            // @ts-ignore
            return http.delete(`/api/pages/${this.page.id}/sections/${id}`)
                .then(() => {
                    // @ts-ignore
                    const sections = this.page.sections.filter(item => item.id !== id)
                    // @ts-ignore
                    this.page.sections = sections
                })
        },
        addSection(data: iSection) {
            setToken()
            const sectionData = removeJsonNullProperties(data.data)

            // @ts-ignore
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
