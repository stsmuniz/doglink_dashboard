import type {NavigationGuardNext, RouteLocationNormalized} from "vue-router";
import {useAuthStore} from "@/stores/auth";

const unprotectedRoutes: string[] = ['login', 'register', 'reset-password', 'forgot-password']

export default async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
) => {
    const store = useAuthStore()

    // @ts-ignore
    const token = store.getToken ? store.getToken : localStorage.getItem('accessToken')
    const routeName = to.name ? to.name.toString() : '';
    if (!unprotectedRoutes.includes(routeName) && !token) {
        try {
            next({name: 'login'})
        } catch (err) {
            //TODO: an error handling
        }
    } else {
        if (to.name === 'login' && token) {
            next({name: 'dashboard'})
        } else {
            next()
        }
    }
}
