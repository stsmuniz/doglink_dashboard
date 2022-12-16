import {defineStore} from "pinia";
import http from "@/http/api";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: null,
        authErrors: []
    }),
    getters: {
        getToken: (state) => state.token,
        getErrors: (state) => state.authErrors
    },
    actions: {
        login(email: string, password: string) {
            this.authErrors = [];
            return http.post('/api/login', {email, password})
                .then(res => {
                    this.token = res.data.data
                    localStorage.setItem('accessToken', res.data.data.token)
                    this.router.push('/dashboard')
                })
        },
        forgotPassword(email: string) {
            this.authErrors = [];
            return http.post('/api/forgot-password', {
                email
            })
        },
        resetPassword(data: any) {
            this.authErrors = [];
            return http.post('/api/reset-password', data)
        },
        register(name: string, email: string, password: string, c_password: string) {
            this.authErrors = [];
            http.post('/api/register', {name, email, password, c_password})
                .then(() => {
                    this.router.push('/login')
                })
                .catch(err => {
                    console.log(err)
                    this.authErrors = err.response.data.data
                    alert('Error on Register')
                    this.destroySession()
                })
        },
        fetchToken() {
            this.token = localStorage.getItem('accessToken')
        },
        destroySession() {
            this.token = null
            localStorage.removeItem('accessToken')
        },
        logout() {
            this.destroySession()
            this.router.push('/login')
        }
    }
})
