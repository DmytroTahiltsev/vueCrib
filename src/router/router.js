import Main from "@/pages/Main"
import PostsPage from "@/pages/PostsPage"
import PostsPageWithStore from "@/pages/PostsPageWithStore"
import PostsPageCompositionApi from "@/pages/PostsPageCompositionApi"
import PostIdPage from "@/pages/PostIdPage"
import About from "@/pages/About"
import ApolloTest from '@/pages/ApolloTest'
import { createRouter, createWebHistory } from "vue-router"

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/posts',
        component: PostsPage
    },
    {
        path: '/posts/:id',
        component: PostIdPage
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/store',
        component: PostsPageWithStore
    },
    {
        path: '/composition',
        component: PostsPageCompositionApi
    },
    {
        path: '/apollo',
        component: ApolloTest
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router