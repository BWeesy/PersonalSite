<template>
  <div class="content-wrapper">
    Developer
    <SwarmSim/>
  </div>
</template>

<script>
import SwarmSim from './SwarmSim/SwarmSim';

export default {
  name: 'Developer',
    components: {
    SwarmSim,
  },
};
</script>

<style land="scss" scoped>
.content-wrapper {
  flex: 1 1 auto;
}
</style>