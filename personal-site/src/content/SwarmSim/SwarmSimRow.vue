<template>
<div>
    <Space v-for="(space, index) in this.spaces" :key="index" :state="space.State" :activity="space.State == 2 ? space.Activity : 0" /> 
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