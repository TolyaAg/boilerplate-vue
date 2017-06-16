<template>
    <div class="alert" v-if="text != ''">
        {{ text }}
    </div>
</template>

<script>
    export default {
        name:'alert-success',
        props: {
            text: { type: String, default: '' }
        }
    }
</script>

<style lang="scss" scoped>
$alert-success-color: #dff0d8;


    .alert {
        padding: 8px;
        border: 1px solid transparent;
        border-radius: 4px;
        color: darken($alert-success-color, 60%);
        background-color: $alert-success-color;
        border-color: darken($alert-success-color, 10%);
        text-align: center;
        position: absolute;
        z-index: 100;
        display: block;
    }
</style>