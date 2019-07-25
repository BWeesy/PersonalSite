<template>
<div>
    <div class = "swarmsim-wrapper">
        <div class="stat-stick-wrapper">
            <StatStick class="stat-stick" :intendedTime = this.intendedRate :callTime = this.getAverageCallTime :waitTime= this.getTimeToWaitBeforeNextFrame :roundTripTime = this.getAverageRoundTripTime />
        </div>
        <div v-if="currentFrame.length > 0" class="frame-wrapper">
            <div class="frame">
                <Row v-for="(row, index) in currentFrame" :key="index" :spaces="row" /> <br/>
                <div>
                    <button v-on:click="startSim()" class="button"> Start </button>
                    <button v-on:click="stopSim()" class="button"> Stop </button>
                    <button v-on:click="resetFrame()" class="button"> Reset </button>
                </div>
            </div>
        </div>
    </div>
    <div v-if="!currentFrame.length > 0">
        <div class="loader"/>
        <button v-if="this.$store.state.swarmSimFailed" v-on:click="resetFrame()" class="button"> Retry </button>
    </div>
</div>
</template>

<script>
import Row from './SwarmSimRow';
import StatStick from './SwarmSimStatStick';

export default {
    name : "SwarmSim",
    components: { 
        Row, StatStick
    },
    created() {
        if(!this.$store.state.SwarmSimFrame || this.$store.state.SwarmSimFrame.length == 0){
            this.$store.dispatch('initFrame');
        } else{
            this.startSim();
        }
    },
    beforeDestroy(){
        this.stopSim();
    },
    data (){
        return {
            intendedRate : 1000,
            lastFiveCalls : [],
            lastTenRoundTripTimes : []
        }
    },
    computed: {
        currentFrame() {
            return this.$store.state.SwarmSimFrame;
        },
        getAverageCallTime() {
            return Math.round(this.lastFiveCalls.reduce(function(p,c,i){return p+(c-p)/(i+1)},0));
        },
        getTimeToWaitBeforeNextFrame() {
            return Math.round(Math.max(this.intendedRate-this.getAverageCallTime,0));
        },
        getAverageRoundTripTime() {
            return Math.round(this.lastTenRoundTripTimes.reduce(function(p,c,i){return p+(c-p)/(i+1)},0));
        },
    },
    methods:{
        startSim() {
            this.$store.dispatch('startSwarmSim');
            this.getNextFrame();
        },
        stopSim() {
            this.$store.dispatch('stopSwarmSim');
        },
        async getNextFrame() {
            var roundTripStart = new Date();
            var callStart = roundTripStart;
            //Make the call and chain the timerPromise to the end of the call promise
            this.$store.dispatch('nextFrame')
                .then(() => {
                    var callEnd = new Date();

                    var timerPromise =new Promise((resolve) => setTimeout(resolve, this.getTimeToWaitBeforeNextFrame));
                    timerPromise.then(() => {
                            if(this.$store.state.swarmSimRunning) {
                                var roundTripEnd = new Date();
                                this.AddToTimesTakenBuffer(callEnd - callStart);
                                this.AddToRoundTripBuffer(roundTripEnd - roundTripStart);
                                this.getNextFrame();
                            }
                        });
                });
        },
        resetFrame() {
            this.stopSim();
            this.$store.dispatch('initFrame');
            this.lastFiveCalls = [];
            this.lastTenRoundTripTimes = [];
        },
        AddToTimesTakenBuffer (timeTaken) {
            this.lastFiveCalls.push(timeTaken);
            if (this.lastFiveCalls.length > 5) {
                this.lastFiveCalls.shift();
            }
        },
        AddToRoundTripBuffer (timeTaken) {
            this.lastTenRoundTripTimes.push(timeTaken);
            if (this.lastTenRoundTripTimes.length > 10) {
                this.lastTenRoundTripTimes.shift();
            }
        },
    }
}
</script>

<style lang="scss" scoped>
@import "../../shared/colour-palette.scss";
@import "../../shared/loading-spinner.scss";
@import "../../shared/button.scss";

.swarmsim-wrapper{
    display :flex;
    flex-direction: column;
    align-items: center;
}
.frame-wrapper {
    margin: 1% 5%;
}
.stat-stick-wrapper {
    float: right;
    margin: 1% 5%;
    padding: 10px;
    background-color: $highlight-colour;
    border-radius: 45px 0 102px 0;
}
.frame {
    margin: 0 auto;
    display: flex;
    flex-flow: column nowrap;
}
.row{
    flex-flow: row nowrap;
}
</style>