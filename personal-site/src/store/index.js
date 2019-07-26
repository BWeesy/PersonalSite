import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        SwarmSimFrame: [], //Array of Arrays, closest thing to 2D
        swarmSimRunning : false,
        swarmSimFailed : false,
        swarmSimFrameRate : 1000,
    },
    mutations:{
        saveNewFrame(state, frame){
            state.SwarmSimFrame = frame;
        },
        saveSwarmSimRunningState(state, running){
            state.swarmSimRunning = running;
        },
        saveSwarmSimFailureState(state, failed){
            state.swarmSimFailed = failed;
        },
        saveSwarmSimFrameRate(state, rate){
            state.swarmSimFrameRate = rate;
        }
    },
    actions: {
        initFrame({commit}){
            commit('saveNewFrame', []);
            commit('saveSwarmSimFrameRate', 1000);

            var url = process.env.NODE_ENV == 'development' ? '/api/InitFrame' : 'https://swarmsim.azurewebsites.net/api/InitFrame?code=GiWQXWY1cb/nO4Mw9TOVuElPZGLidWSV0ulanCq6TRTDyKxGwXMI0w==';
            axios.get(url, { crossdomain: true })
            .then(result => {
                commit('saveNewFrame', result.data);
                commit('saveSwarmSimFailureState', false);
            })
            .catch(() => {
                commit('saveSwarmSimRunningState', false);
                commit('saveSwarmSimFailureState', true);
            });
        },
        nextFrame({commit}) {
            var url = process.env.NODE_ENV == 'development' ? '/api/NextFrame' : 'https://swarmsim.azurewebsites.net/api/NextFrame?code=uwc7JOsp9hhpi9eLEItGjQh4fLAsPOEe5cMI3qBK8EpNybVpVjv/YQ==';
            return axios.post(url, this.state.SwarmSimFrame, { crossdomain: true })
            .then(result => {
                commit('saveNewFrame', result.data);
                commit('saveSwarmSimFailureState', false);
            })
            .catch(() => {
                commit('saveSwarmSimRunningState', false);
                commit('saveSwarmSimFailureState', true);
            });
        },
        startSwarmSim({commit}){
            commit('saveSwarmSimRunningState', true);
        },
        stopSwarmSim({commit}){
            commit('saveSwarmSimRunningState', false);
        },
        setFrameRate({commit}, rate){
            commit('saveSwarmSimFrameRate', rate);
        }
    }
});