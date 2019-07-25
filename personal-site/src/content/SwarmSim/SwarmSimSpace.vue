<template>
<div>
        <div v-if="this.state == 0" class="wall" :style = "SpaceSize"></div>
        <div v-if="this.state == 1" class="unexplored" :style = "SpaceSize"></div>
        <div v-if="this.state == 2" class="explored" :style = "SpaceSize + ExploredOpacity"></div>
        <div v-if="this.state == 3" class="ungrouped-drone" :style = "SpaceSize"></div>
        <div v-if="this.state == 4" class="leader-drone" :style = "SpaceSize"></div>
        <div v-if="this.state == 5" class="subordinate-drone" :style = "SpaceSize"></div>
</div>
</template>

<script>
    export default {
        name: 'Space',
        props: ['state', 'activity', 'spacesInRow'],
        methods: {
            getSpaceSize(){
                return 'height: ' + 50/this.spacesInRow + 'vh ; width: ' + 50/this.spacesInRow + 'vh;';
            },
            getExploredOpacity(){
                return 'opacity: ' + Math.max((this.activity ? this.activity : 0)/100,0.1);
            },
        },
        computed: {
            currentState() {
                return this.state;
            },
            getActivity() {
                return this.activity ? this.activity : 0;
            },
            getClass(){
                switch (this.state) {
                    case 0:
                        return 'wall';
                    case 1:
                        return 'unexplored';
                    case 2:
                        return 'explored';
                    case 3:
                        return 'ungrouped-drone';
                    case 4:
                        return 'leader-drone';
                    case 5:
                        return 'subordinate-drone';
                    default:
                        return '';
                }
            },
            SpaceSize(){
                return 'height: ' + 50/this.spacesInRow + 'vh ; width: ' + 50/this.spacesInRow + 'vh;';
            },
            ExploredOpacity(){
                return 'opacity: ' + Math.max((this.activity ? this.activity : 0)/100,0.1);
            },
            getStyle() {
                switch (this.state) {
                    case 0:
                        return this.getSpaceSize();
                    case 1:
                        return this.getSpaceSize();
                    case 2:
                        return this.getSpaceSize() + this.getExploredOpacity();
                    case 3:
                        return this.getSpaceSize();
                    case 4:
                        return this.getSpaceSize();
                    case 5:
                        return this.getSpaceSize();
                    default:
                        return "";
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
@import "./swarmsim-palette.scss";
.wall{
    background-color: $wall;
}
.unexplored{
    background-color: $unexplored;
}
.explored{
    background-color: $explored;
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
.fade-enter-active {
  transition: opacity 1s;
}
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter .fade-leave /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>