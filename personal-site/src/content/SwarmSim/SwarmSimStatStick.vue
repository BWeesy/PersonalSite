<template>
    <div>
        <div class="bar intended-time-bar"/>
        <div class="total-time-bar">
            <div class="bar call-time-bar" :style = "callTimeHeight"/>
            <div class="bar wait-time-bar" :style = "waitTimeHeight"/>
        </div>
        <div class="bar round-trip-time-bar" :style = "roundTripTimeHeight"/>
        <div class="intended-label">Intended time per frame {{intendedTime}} ms</div>
        <div class="call-label">Average Time Taken for make request {{callTime}} ms</div>
        <div class="wait-label">Time waiting before next call {{waitTime}} ms</div>
        <div class="round-trip-label">Achieved average round trip time of {{roundTripTime}} ms </div>
    </div>
</template>

<script>
    export default {
        name:'StatStick',
        props: ['intendedTime', 'callTime', 'waitTime', 'roundTripTime'],
        computed:{
            callTimeHeight() {
                return 'height: ' + 450 * this.callTime/this.intendedTime + 'px';
            },
            waitTimeHeight(){
                return 'height: ' + 450 * this.waitTime/this.intendedTime + 'px';
            },
            roundTripTimeHeight(){
                return 'height: ' + 450 * this.roundTripTime/this.intendedTime + 'px';
            }
        }
    }
</script>

<style lang="scss" scoped>
$intended-time-colour: green;
$call-time-colour: red;
$wait-time-colour: yellow;
$round-trip-time-colour: orange;
.total-time-bar{
    float: left;
}
.bar {
  width: 10px;
}
.intended-time-bar{
    float: left;
    height: 450px;
    background-color: $intended-time-colour;
}
.call-time-bar{
    background-color: $call-time-colour;
}
.wait-time-bar{
    background-color: $wait-time-colour;
}
.round-trip-time-bar{
float: left;
height: 50px;
background-color: $round-trip-time-colour;
}
.intended-label{
    background-color: $intended-time-colour;
}
.call-label{
    background-color: $call-time-colour;
}
.wait-label{
    background-color: $wait-time-colour;
}
.round-trip-label{
    background-color: $round-trip-time-colour;
}
</style>