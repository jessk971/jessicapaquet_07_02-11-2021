import Vue from "vue"
import VueRouter from 'vue-router';
import Home from '../Views/Home.vue'




const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/Signup',
        name: 'Signup',
        component: () =>
            import ("../Views/Signup.vue"),
    },
    {
        path: '/Login',
        name: 'Login',
        component: () =>
            import ("../Views/Login.vue"),
    },
    {
        path: '/WallPublications',
        name: 'WallPublications',
        component: () =>
            import ("../Views/WallPublications.vue"),
    }
]
Vue.use(VueRouter)

const router = new VueRouter({
    routes
})

export default router