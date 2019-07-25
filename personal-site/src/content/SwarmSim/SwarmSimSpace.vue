<template>
<div>
        <div :class="getClass" :style = "getStyle"></div>
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
                        return 'space wall';
                    case 1:
                        return 'space unexplored';
                    case 2:
                        return 'space explored';
                    case 3:
                        return 'space ungrouped-drone';
                    case 4:
                        return 'space leader-drone';
                    case 5:
                        return 'space subordinate-drone';
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
.space{
    transition: background-color 0.25s ease-in-out;
}
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

</style>