<template>
<div>
    <Face class="face"/>
    <nav class="corner">
        <ul>
            <li><router-link to="/">Developer</router-link></li>
            <li><router-link to="/Scientist">Scientist</router-link></li>
        </ul>
        <ul class="corner">
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
    display: flex;
    transform: translateX(-12px);
    border-radius: 0 0 50px 0;
}
nav ul{
    float:left;
    margin: 0;
    padding: 0;
    background-color: $highlight-colour;
}
.corner{
    border-radius: 0 0 50px 0;
}
nav ul li {
    display: inline-block;
    list-style-type: none;
    margin: 0;
}
nav > ul > li > a {
    color: #ffffff;
    display: block;
    line-height: 2em;
    padding: 0.5em 0.5em;
    text-decoration: none;
    font-weight: bold;
}
</style>
