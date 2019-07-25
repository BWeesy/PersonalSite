<template>
<div>
    <div class = "swarmsim-wrapper">
        <div class="stat-stick-wrapper">
            <StatStick class="stat-stick" :intendedTime = this.intendedRate :callTime = this.getAverageCallTime :waitTime= this.getTimeToWaitBeforeNextFrame :roundTripTime = this.getAverageRoundTripTime />
        </div>
        <div v-if="currentFrame.length > 0" class="frame-wrapper">
            <div class="frame">
                <div v-for="(row, index) in currentFrame" :key="index">
                    <Row :spaces="row" /> <br/>
                </div>
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
        this.$store.dispatch('initFrame');
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

.swarmsim-wrapper{
    display :flex;
    flex-direction: column;
}
.frame-wrapper {
    text-align: center;
    margin: auto;
}
.stat-stick-wrapper {
    float: right;
    margin: 1% 5%;
    padding: 10px;
    background-color: $highlight-colour;
    border-radius: 50px 0% 102px 0px;
}
.frame {
    display: inline-block;
    width : 450px;
    margin: 0 auto;
}
</style>