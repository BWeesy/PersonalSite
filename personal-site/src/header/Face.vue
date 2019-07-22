<template>
<div class="image-background">
    <div class="image-cropper">
        <img alt="Face" src="..\assets\Face.png">
    </div>
</div>
</template>

<script>
    export default {
        name: 'Face',
    }
</script>

<style lang="scss" scoped>
img {
    display: inline;
    margin: 0 auto;
    height: 100%;
    width: auto;
}
.image-cropper {
    width: 120px;
    height: 120px;
    position: relative;
    overflow: hidden;
    border-radius: 50%;
    margin: 5px 5px;
}

.image-background {
    width: 150px;
    height: 150px;
    position: relative;
    overflow: hidden;
    border-radius: 0% 0% 102px 0px;
    background-color: #243447;
}
</style>