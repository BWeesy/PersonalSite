<template>
    <div>
SWARMSIM!
        <div v-if="currentFrame.length > 0" class="frame-wrapper">
            <div v-for="(row, index) in currentFrame" :key="index">
                <Row :spaces="row" /> <br/>
            </div>
        </div>
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
            console.log(this.$store.state.SwarmSimFrame);
            return this.$store.state.SwarmSimFrame;
        }
    }
}
</script>

<style lang="scss" scoped>
.frame-wrapper {
    margin-top:100px;
    float: center;
}
</style>