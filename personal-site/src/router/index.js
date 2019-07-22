import Vue from 'vue';
import Router from 'vue-router';

import Developer from '../content/Developer.vue';
import Scientist from '../content/Scientist.vue';
import Graduate from '../content/Graduate.vue';
import Dancer from '../content/Dancer.vue';

Vue.use(Router);

export default new Router({
    routes:[{
        path: '/',
        name: 'Developer',
        component : Developer
    }, {
        path: '/Scientist',
        name: 'Scientist',
        component : Scientist
    }, {
        path: '/Graduate',
        name: 'Graduate',
        component : Graduate
    }, {
        path: '/Dancer',
        name: 'Dancer',
        component : Dancer
    },
    ],
})