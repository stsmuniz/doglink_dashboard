import {defineStore} from "pinia";
import http from "@/http/api";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: '',
        authErrors: []
    }),
    getters: {
        getToken: (state) => state.token,
        getErrors: (state): any => state.authErrors
    },
    actions: {
        login(email: string, password: string) {
            this.authErrors = [];
            return http.post('/api/login', {email, password})
                .then(res => {
                    this.token = res.data.data
                    // @ts-ignore
                    localStorage.setItem('accessToken', res.data.data.token)
                    // @ts-ignore
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
                    // @ts-ignore
                    this.router.push('/login')
                })
                .catch(err => {
                    this.authErrors = err.response.data.data
                    // @ts-ignore
                    alert('Error on Register')
                    this.destroySession()
                })
        },
        fetchToken() {
            // @ts-ignore
            this.token = localStorage.getItem('accessToken')
        },
        destroySession() {
            this.token = ''
            // @ts-ignore
            localStorage.removeItem('accessToken')
        },
        logout() {
            this.destroySession()
            // @ts-ignore
            this.router.push('/login')
        }
    }
})
