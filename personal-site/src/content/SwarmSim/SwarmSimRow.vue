<template>
    <div v-if="this.spaces.length > 0">
        <div v-for="(space, index) in this.spaces" :key="index">
            <Space :state="space.State" :activity="space.State == 2 ? space.Activity : 0" /> 
        </div>
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
}
</script>

<style lang="scss" scoped>

</style>