<template>
<div class = "swarmsim-description">
    <h1> Swarm Sim </h1>
    <p>
    The swarm sim is a simple problem that in itself doesn't do anything useful. It is however a useful testbed to try a lot of different technologies at once, all of which are virtually free with the Free Trial Azure subscription.
    </p>
    <p>
Source code from <a href="https://github.com/BWeesy/SwarmSim" >github.com/BWeesy/SwarmSim </a> is continuously integrated and deployed using the Azure DevOps pipeline into an Azure Function App.
The Azure function app has two functions, InitFrame and NextFrame. Init frame generates a new maze and provides the JSON representation while NextFrame takes a JSON representation of a maze and returns the next iteration.
Both functions are stateless and serverless, meaning they scale well with concurrent users and are agnostic to whatever the front end representation is. It could range from a console app to an array of tvs on the side of a building, the backend doesn't care.
    </p>
    <p>
The SwarmSim uses Axios to make calls to the two functions (CORS enabled) that are then rendered using two v-for loops to turn the 2D JSON array into row components that have space components in them.
This allows all the rendering logic for a given square to be kept in one place, giving each of the components a single responsibility.
This setup gives a way to pass reasonably complicated data between vue components, so was a good test bed for flexing the features in Vue. This was achieved by implementing the statstick, the bars and data next to the SwarmSim.
For this, the response time of the last 5 function calls are averaged to produce an estimate of the response time. The desired frame rate is known, so the frame then waits frame rate - response time = wait time.
These numbers are passed from the SwarmSim into the statstick to give feedback to the user on the performance of the system.
    </p>
</div>
</template>

<script>
    export default {
        name: 'description'
    }
</script>

<style lang="scss" scoped>
@import "../../shared/link.scss";
</style>
