<template>
<div>
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
            <div class="label intended-label">Intended time per frame {{intendedTime}} ms</div>
        </div>
        <div class = "label-wrapper">
            <div class = "swatch call-swatch"/>
            <div class="label call-label">Average Time Taken for make request {{callTime}} ms</div>
        </div>
        <div class = "label-wrapper">
            <div class = "swatch wait-swatch"/>
            <div class="label wait-label">Time waiting before next call {{waitTime}} ms</div>
        </div>
        <div class = "label-wrapper">
            <div class = "swatch round-swatch"/>
            <div class="label round-trip-label">Achieved average round trip time of {{roundTripTime}} ms </div>
        </div>
    </div>
</div>
</template>

<script>
    export default {
        name:'StatStick',
        props: ['intendedTime', 'callTime', 'waitTime', 'roundTripTime'],
        computed:{
            callTimeWidth() {
                return 'width: ' + 450 * this.callTime/this.maximumTime + 'px';
            },
            waitTimeWidth(){
                return 'width: ' + 450 * this.waitTime/this.maximumTime + 'px';
            },
            roundTripTimeWidth(){
                return 'width: ' + 450 * this.roundTripTime/this.maximumTime + 'px';
            },
           intendedTimeWidth(){
                return 'width: ' + 450 * this.intendedTime/this.maximumTime + 'px';
            },
            maximumTime(){
                return Math.max(this.intendedTime, this.roundTripTime, this.callTime, this.waitTime);
            },            
        }
    }
</script>

<style lang="scss" scoped>
@import "../../shared/colour-palette.scss";

$intended-time-colour: green;
$call-time-colour: red;
$wait-time-colour: yellow;
$round-trip-time-colour: orange;

.key-wrapper{
    float : left;
    margin: auto 5%;
    background-color: $emboss-colour;
    padding: 5px 5px 5px 5px;
    border-radius: 0% 0% 102px 0px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}

.bars-wrapper {
    width: 450px;
    margin: auto 5%;
    display: flex;
    flex-direction: column;
}

.total-time-bar{
    display: flex;
    flex-direction: row;
}

.bar {
  height: 10px;
}
.intended-time-bar{
    background-color: $intended-time-colour;
}
.call-time-bar{
    background-color: $call-time-colour;
}
.wait-time-bar{
    background-color: $wait-time-colour;
}
.round-trip-time-bar{
background-color: $round-trip-time-colour;
}
.label-wrapper{
    display: flex;
    flex-direction: row;
}
.swatch{
    height: 2em;
    width: 10%;
    margin: 0;
    float: left;
    flex-basis : 20px
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