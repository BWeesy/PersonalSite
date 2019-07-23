import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        SwarmSimFrame: [], //Array of Arrays, closest thing to 2D
    },
    mutations:{
        saveNewFrame(state, frame){
            state.SwarmSimFrame = frame;
        },
    },
    actions: {
        initFrame({commit}){
            var url = process.env.NODE_ENV == 'development' ? '/api/InitFrame' : 'https://swarmsim.azurewebsites.net/api/InitFrame?code=GiWQXWY1cb/nO4Mw9TOVuElPZGLidWSV0ulanCq6TRTDyKxGwXMI0w==';
            axios.get(url, { crossdomain: true })
            .then(result => commit('saveNewFrame', result.data))
                .catch(console.error);
        },
        nextFrame({commit}) {
            var url = process.env.NODE_ENV == 'development' ? '/api/NextFrame' : 'https://swarmsim.azurewebsites.net/api/NextFrame?code=uwc7JOsp9hhpi9eLEItGjQh4fLAsPOEe5cMI3qBK8EpNybVpVjv/YQ==';
            axios.post(url, this.state.SwarmSimFrame, { crossdomain: true })
            .then(result => commit('saveNewFrame', result.data))
            .catch(console.error);
        }
    }
});