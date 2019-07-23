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
            axios.get('/api/InitFrame')
                .then(result => commit('saveNewFrame', result.data))
                .catch(console.error);
        },
        nextFrame({commit}, frame) {
            console.log(this.state.SwarmSimFrame);
            axios.post('/api/NextFrame', this.state.SwarmSimFrame)
            .then(result => commit('saveNewFrame', result.data))
            .catch(console.error);
        }
    }
});