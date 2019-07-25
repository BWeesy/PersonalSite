<template>
<div class="row">
    <Space v-for="(space, index) in this.spaces" :key="index" :state="space.State" :spacesInRow="spacesInRow" :activity="space.State == 2 ? space.Activity : 0" class="space" /> 
</div>
</template>

<script>
import Space from './SwarmSimSpace';
export default {
    name: "Row",
    components: {
        Space,
    },
    props: ['spaces'],
    computed: {
        spacesInRow(){
            if(this.spaces && this.spaces.length > 0){
                return this.spaces.length;
            } else {
                return 1;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.row{
display: flex;
flex-flow: row nowrap;
}
</style>