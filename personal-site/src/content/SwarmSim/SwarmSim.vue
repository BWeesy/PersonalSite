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
            <div>Achieved average round trip time of {{getAverageRoundTripTime}} ms over last 10 calls </div>
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
        async startSim() {
            if (!this.runSimFlag) {
                this.runSimFlag = true;
                this.getNextFrame()
            }        
        },
        stopSim() {
            this.runSimFlag = false;
        },
        async getNextFrame() {
            //Start timers
            var roundTripStart = new Date();
            var callStart = roundTripStart;

            //Start actual call to get next frame
            var callPromise = this.$store.dispatch('nextFrame')
            .then(() => {
                var callEnd = new Date();
                this.AddToTimesTakenBuffer(callEnd - callStart);
            });

            //Set a timer to give a minimum round trip time to limit frame rate
            var timerPromise = new Promise((resolve) => setTimeout(resolve, this.getTimeToWaitBeforeNextFrame));

            //Wait for both promises, then get next frame
            Promise.all([timerPromise, callPromise])
            .then(() => {
                var roundTripEnd = new Date();
                this.AddToRoundTripBuffer(roundTripEnd - roundTripStart);
                if(this.runSimFlag) {
                    this.getNextFrame();
                }
            });
        },
        resetFrame() {
            this.$store.dispatch('initFrame');
            this.stopGame();
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