<template>
    <div>
        <time-input></time-input>
    </div>
</template>

<script>
import TimeInput from "TimeInput"

export default {
    name: "app",
    components: {
        TimeInput
    }
}
</script>

<style type="text/css" src="./styles/icons/css/merlion-fonts.css"></style>
<style type="text/css" src="./styles/icons/css/animation.css"></style>
<style type="text/css" src="./styles/normalize.css"></style>

<style lang="scss">

body {
    scrollbar-face-color: rgba(153, 162, 173, 0.3);
    scrollbar-arrow-color:  rgba(153, 162, 173, 0.3);
    font-family: sans-serif !important;
}

::-webkit-scrollbar{
    width: 6px;
}

::-webkit-scrollbar-thumb{
    background-color: rgba(64, 71, 80, 0.3);
    border-radius: 5px;
    display: block;
    transition: background-color .3s;

    &:hover {
        background-color: darken(rgba(64, 71, 80, 0.3), 20%);
    }
}
</style>
