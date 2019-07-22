<template>
<div>
    <Face class="face"/>
    <nav>
        <ul>
            <li><a href="Developer.html">Developer</a></li>
            <li><a href="Scientist.html">Scientist</a></li>
            <li><a href="Dancer.html">Dancer</a></li>
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
