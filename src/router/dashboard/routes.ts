import dashboard from "@/views/dashboard/index.vue";
import UserProfile from "@/views/dashboard/UserProfile.vue";
import Page from "@/views/dashboard/Page.vue";
export default [
    {
        path: '/dashboard',
        name: 'dashboard',
        component: dashboard,
        meta: {
            title: 'Dashboard'
        }
    },
    {
        path: '/profile',
        name: 'profile',
        component: UserProfile,
        meta: {
            title: 'Profile'
        }
    },
    {
        path: '/page',
        name: 'page',
        component: Page,
        meta: {
            title: 'Page'
        }
    }
]
