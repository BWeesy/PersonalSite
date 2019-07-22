<template>
<div>
    <Face class="face"/>
    <nav>
        <ul>
            <li><router-link to="/">Developer</router-link></li>
            <li><router-link to="/Scientist">Scientist</router-link></li>
            <li><router-link to="/Graduate">Graduate</router-link></li>
            <li><router-link to="/Dancer">Dancer</router-link></li>
        </ul>
    </nav>
</div>
</template>

<script>
import Face from './Face.vue';
export default {
    name: 'Header',
    components : {
        Face,
    }
};
</script>

<style lang="scss" scoped>
@import "../shared/colour-palette.scss";
.face {
    float:left;
    background-color: $highlight-colour;
}
nav {
    background-color: $highlight-colour;
    margin: 0;
    overflow: hidden;
}
nav ul{
    float:left;
    margin: 0;
    padding: 0;
}
nav ul li {
    display: inline-block;
    list-style-type: none;
    margin: 0;
}
nav > ul > li > a {
    color: #ffffff;
    background-color: $highlight-colour;
    display: block;
    line-height: 2em;
    padding: 0.5em 0.5em;
    text-decoration: none;
}
</style>
