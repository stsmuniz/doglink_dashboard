import type {NavigationGuardNext, RouteLocationNormalized} from "vue-router";
import {useAuthStore} from "@/stores/auth";

const unprotectedRoutes = ['login', 'register', 'reset-password', 'forgot-password']

export default async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
) => {
    const store = useAuthStore()

    const token = store.getToken ? store.getToken : localStorage.getItem('accessToken')

    if (!unprotectedRoutes.includes(to.name) && !token) {
        try {
            next({name: 'login'})
        } catch (err) {
            console.error(err)
        }
    } else {
        if (to.name === 'login' && token) {
            next({name: 'dashboard'})
        } else {
            next()
        }
    }
}
