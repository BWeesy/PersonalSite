<template>
<div>
    <div class="stats-wrapper">
        <div class="bars-wrapper">
            <div class="bar intended-time-bar" :style = "intendedTimeWidth"/>
            <div class="total-time-bar">
                <div class="bar call-time-bar" :style = "callTimeWidth"/>
                <div class="bar wait-time-bar" :style = "waitTimeWidth"/>
            </div>
            <div class="bar round-trip-time-bar" :style = "roundTripTimeWidth"/>
        </div>
        <div class="key-wrapper">
            <div class = "label-wrapper">
                <div class = "swatch intended-swatch"/>
                <div class="label intended-label">Time per frame <br/> {{intendedTime}} ms</div>
                <div class = "swatch round-trip-swatch"/>
                <div class="label round-trip-label">Round trip time <br/> {{roundTripTime}} ms </div>
            </div>
            <div class = "label-wrapper">
                <div class = "swatch call-swatch"/>
                <div class="label call-label">Response time <br/> {{callTime}} ms</div>
                <div class = "swatch wait-swatch"/>
                <div class="label wait-label">Waiting time <br/> {{waitTime}} ms</div>
            </div>
        </div>
    </div>
    <VueKnobControl class="knob"
        v-model="intendedTime"
        :min="500"
        :max="1500"
        primary-color="#529e72" secondary-color="#811c41" text-color="#40d87f">
    </VueKnobControl>
</div>
</template>

<script>
import VueKnobControl from 'vue-knob-control'
    export default {
        name:'StatStick',
        props: ['callTime', 'waitTime', 'roundTripTime'],
        components : {
            VueKnobControl,
        },
        computed:{
            callTimeWidth() {
                return 'width: ' + 100 * this.callTime/this.maximumTime + '%';
            },
            waitTimeWidth(){
                return 'width: ' + 100 * this.waitTime/this.maximumTime + '%';
            },
            roundTripTimeWidth(){
                return 'width: ' + 100 * this.roundTripTime/this.maximumTime + '%';
            },
           intendedTimeWidth(){
                return 'width: ' + 100 * this.intendedTime/this.maximumTime + '%';
            },
            maximumTime(){
                return Math.max(this.intendedTime, this.roundTripTime, this.callTime, this.waitTime);
            },
            intendedTime:{
                get(){
                    return this.$store.state.swarmSimFrameRate;
                },
                set(rate){
                    this.$store.commit('saveSwarmSimFrameRate', rate);
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
@import "../../shared/colour-palette.scss";

$intended-time-colour: #529e72;
$call-time-colour: #de356a;
$wait-time-colour: #fdc8b7;
$round-trip-time-colour: #f67e7d;
.stats-wrapper{
    float: left;
}

.knob{
    float: right;
    background-color: $emboss-colour;
    border-radius: 0 0 50px 0;
    padding: 5px 5px 5px 5px;
    margin: 0 0 0 -12px;
}

.key-wrapper{
    background-color: $emboss-colour;
    padding: 0 15px 15px 15px;
    border-radius: 0 0 102px 0;
    display: flex;
    flex-flow: row wrap;
}

.bars-wrapper {
    padding: 5% 5% 0 5%;
    display: flex;
    flex-direction: column;
    background-color: $emboss-colour;
    border-radius: 45px 0 0 0;
}

.total-time-bar{
    display: flex;
    flex-direction: row;
}

.bar {
  height: 10px;
  transition: width 0.25s ease-in-out;
}
.intended-time-bar{
    background-color: $intended-time-colour;
    border-radius: 0 5px 0 0;
}
.call-time-bar{
    background-color: $call-time-colour;
}
.wait-time-bar{
    background-color: $wait-time-colour;
}
.round-trip-time-bar{
background-color: $round-trip-time-colour;
border-radius: 0 0 5px 0;
}
.label-wrapper{
    display: flex;
    flex-basis: 100%;
    padding: 5px;
}
.swatch{
    height: 2em;
    width: 10%;
    margin: 0;
    flex-basis: 20px;
    border-radius: 5px;
}
.intended-swatch{
    background-color: $intended-time-colour;
}
.call-swatch{
    background-color: $call-time-colour;
}
.wait-swatch{
    background-color: $wait-time-colour;
}
.round-trip-swatch{
    background-color: $round-trip-time-colour;
}

.label{
    width: 80%;
}
</style>