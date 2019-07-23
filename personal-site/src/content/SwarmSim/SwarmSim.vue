<template>
    <div>
        <div v-if="currentFrame.length > 0" class="frame-wrapper">
            <div class="frame">
                <div v-for="(row, index) in currentFrame" :key="index">
                    <Row :spaces="row" /> <br/>
                </div>
            </div>
            <div>Intended time per frame {{intendedRate}} ms</div>
            <div>Average Time Taken for make request over last 5 frames {{getAverageCallTime}} ms</div>
            <div>Time waiting before next call {{getTimeToWaitBeforeNextFrame}} ms</div>
        </div>
        <button v-on:click="startSim()" class="next-frame-button"> Start </button>
        <button v-on:click="stopSim()" class="next-frame-button"> Stop </button>
        <button v-on:click="resetFrame()" class="next-frame-button"> Reset </button>
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
    data (){
        return {
            runSimFlag : false,
            intendedRate : 1500,
            lastFiveCalls : []
        }
    },
    computed: {
        currentFrame() {
            return this.$store.state.SwarmSimFrame;
        },
        getAverageCallTime() {
            return this.lastFiveCalls.reduce(function(p,c,i){return p+(c-p)/(i+1)},0);
        },
        getTimeToWaitBeforeNextFrame() {
            var timeToWait = Math.max(this.intendedRate-this.getAverageCallTime,0);
            console.log(timeToWait)
            return timeToWait;
        },
    },
    methods:{
        async startSim() {
            this.runSimFlag = true;
            do{
                var promise = new Promise((resolve) => setTimeout(resolve, this.getTimeToWaitBeforeNextFrame));
                await promise.then(this.getNextFrame);
            } while (this.runSimFlag)         
        },
        stopSim() {
            this.runSimFlag = false;
        },
        async getNextFrame() {
            var startTime = new Date();
            await this.$store.dispatch('nextFrame');
            var endTime = new Date();
            this.AddToBuffer(endTime - startTime);
        },
        resetFrame() {
            this.$store.dispatch('initFrame');
            this.stopGame();
        },
        AddToBuffer (timeTaken) {
            this.lastFiveCalls.push(timeTaken);
            if (this.lastFiveCalls.length > 5) {
                this.lastFiveCalls.shift();
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.frame-wrapper {
    margin: 100px auto;
    text-align: center;
}
.frame {
    display: inline-block;
    width : 450px;
    margin: 0 auto;
}
</style>