<template>
    <div>
        <div v-if="currentFrame.length > 0" class="frame-wrapper">
            <div class="frame">
                <div v-for="(row, index) in currentFrame" :key="index">
                    <Row :spaces="row" /> <br/>
                </div>
            </div>
        </div>
        <button v-on:click="getNextFrame()" class="next-frame-button"> Next Frame </button>
    </div>
</template>

<script>
import Row from './SwarmSimRow';

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
        getNextFrame() {
            this.$store.dispatch('nextFrame');
        }
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