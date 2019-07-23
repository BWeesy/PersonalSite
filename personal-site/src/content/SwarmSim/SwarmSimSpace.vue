<template>
    <div class="space-wrapper">
        <div v-if="this.state == 0" class="space wall"></div>
        <div v-if="this.state == 1" class="space unexplored"></div>
        <div v-if="this.state == 2" class="space explored"></div>
        <div v-if="this.state == 3" class="space ungrouped-drone"></div>
        <div v-if="this.state == 4" class="space leader-drone"></div>
        <div v-if="this.state == 5" class="space subordinate-drone"></div>
    </div>
</template>

<script>
    export default {
        name: 'Space',
        props: ['state'],
        computed: {
            currentState() {
                console.log(this.state);
                return this.state;
            }
        }
    }
</script>

<style lang="scss" scoped>
@import "./swarmsim-palette.scss";
.space-wrapper {
    float: left;
}
.space {
    height:18px;
    width:18px;
}
.wall{
    background-color: $wall;
}
.unexplored{
    background-color: $unexplored;
}
.explored{
    background-color:$explored;
}
.ungrouped-drone{
    background-color:$ungrouped-drone;
}
.leader-drone{
    background-color:$leader-drone;
}
.subordinate-drone{
    background-color:$subordinate-drone;
}
</style>