<template>
    <div class="space">
        {{this.state}}
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
.space {
    float: left;
}
</style>