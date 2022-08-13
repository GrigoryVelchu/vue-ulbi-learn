import Main from "@/pages/Main";
import {createRouter, createWebHistory} from "vue-router";
import PostPage from "@/pages/PostPage";
import About from "@/pages/About";
import PostId from "@/components/PostId";
import PostPageWithVuex from "@/pages/PostPageWithVuex";
import PostPageComposition from "@/pages/PostPageComposition";

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/posts',
        component: PostPage
    },
    {
        path: '/about',
        component: About
    },
    {
        path:'/posts/:id',
        component: PostId,
    },
    {
        path:'/store',
        component: PostPageWithVuex
    },
    {
        path:'/composition',
        component: PostPageComposition
    }
]
const router = createRouter({
    routes,
    history:createWebHistory(),
})

export default router;