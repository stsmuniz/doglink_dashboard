import {createPinia, defineStore} from "pinia";
import http, {setBearerToken} from "@/http/api";
import {createApp} from "vue";
import App from "@/App.vue";
import {useAuthStore} from "@/stores/auth";

const pinia = createPinia();
const app = createApp(App)
app.use(pinia)

const authStore = useAuthStore();

const setToken = () => {
    const token = authStore.token ? authStore.token : localStorage.getItem('accessToken')
    setBearerToken(token)
}
export const useUserStore = defineStore('user', {
    state: () => ({
        user: {}
    }),
    getters: {
        getUser: (state) => state.user,
        getUserProfilePicture: (state) => state.user
            ? state.user.profile_pic
            : "@/assets/images/Portrait_Placeholder.png",
        getUserCustomUrl: (state) => state.user?.custom_url
    },
    actions: {
        getUserData() {
            setToken()
            http.get('/api/user')
                .then(res => this.user = res.data)
        },
        updateProfile(data: any) {
            setToken()
            http.put('/api/user', data)
                .then(res => this.user = res.data)
        },
        updateProfilePicture(data: any) {
            setToken()
            http.post('/api/profile-picture', {image: data.value}, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(res => {
                    console.log(res.data.data)
                    this.user.profile_pic = res.data.data.image
                })
        },
        deleteProfilePicture() {
            setToken()
            return http.delete('/api/profile-picture')
                .then(this.user.profile_pic = null)
        },
        deleteProfile() {
            setToken()
            return http.delete('/api/user')
        }
    }
})
