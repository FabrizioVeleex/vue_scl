import { createRouter, createWebHistory } from "vue-router";

import HomePage from './pages/HomePage.vue';
import OrangeFeedbackPage from "./pages/OrangeFeedbackPage.vue";
// import RedFeedbackPage from "./pages/RedFeedbackPage.vue";
import ThankYouPage from "./pages/ThankYouPage.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "Home",
            component: HomePage,
        },
        {
            path: "/orange-feedback/:choiceId",
            name: "OrangeFeedback",
            component: OrangeFeedbackPage,
        },
        {
            path: "/thank-you",
            name: "ThankYou",
            component: ThankYouPage,
        },
    ],
});

export { router };
