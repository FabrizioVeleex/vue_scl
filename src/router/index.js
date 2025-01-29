import { createRouter, createWebHashHistory } from "vue-router";

import HomePage from '@/pages/HomePage.vue';
import FeedbackPage from "@/pages/FeedbackPage.vue";
import ThankYouPage from "@/pages/ThankYouPage.vue";

const router = createRouter({
    history: createWebHashHistory(),
    base: '/',
    routes: [
        {
            path: "/",
            name: "Home",
            component: HomePage,
        },
        {
            path: "/page-feedback/:choiceId",
            name: "Feedback",
            component: FeedbackPage,
        },
        {
            path: "/thank-you",
            name: "ThankYou",
            component: ThankYouPage,
        },
    ],
});

export { router };
