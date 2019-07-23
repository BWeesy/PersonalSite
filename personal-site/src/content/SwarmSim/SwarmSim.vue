<template>
    <div>
        <div v-if="currentFrame.length > 0" class="frame-wrapper">
            <div class="frame">
                <div v-for="(row, index) in currentFrame" :key="index">
                    <Row :spaces="row" /> <br/>
                </div>
            </div>
        </div>
        <button v-on:click="startGame()" class="next-frame-button"> Start </button>
        <button v-on:click="stopGame()" class="next-frame-button"> Stop </button>
        <button v-on:click="resetFrame()" class="next-frame-button"> Reset </button>
    </div>
</template>

<script>
import Row from './SwarmSimRow';
import { setTimeout } from 'timers';
var interval;

export default {
    name : "SwarmSim",
    components: { 
        Row,
    },
    created() {
        this.$store.dispatch('initFrame');
    },
    computed: {
        currentFrame() {
            return this.$store.state.SwarmSimFrame;
        }
    },
    methods:{
        async startGame() {         
            interval = setInterval(this.getNextFrame,1500);
        },
        stopGame() {
            clearInterval(interval);
        },
        async getNextFrame() {
            await this.$store.dispatch('nextFrame');
        },
        resetFrame() {
            this.$store.dispatch('initFrame');
            this.stopGame();
        },
    }
}
</script>

<style lang="scss" scoped>
.frame-wrapper {
    margin-top:100px;
    text-align: center
}
.frame {
    display: inline-block;
    width : 450px;
}
</style>