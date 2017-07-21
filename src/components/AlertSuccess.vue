<template>
    <transition name="alert-success">
        <div class="alert" v-if="text != ''">
            <div class="alert__text">
                {{ text }}
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: "alert-success",
    props: {
        text: { type: String, default: "" }
    }
}
</script>

<style lang="scss" scoped>
$alert-success-color: #dff0d8;

.alert-success-enter-active, .alert-success-leave-active {
    transition: opacity .5s ease-in-out;
}

.alert-success-enter, .alert-success-leave-to /* .fade-leave-active для <2.1.8 */ {
    opacity: 0;
}

.alert {
    position: absolute;
    z-index: 100;
    display: block;
    width: 100%;

    .alert__text {
        padding: 8px;
        border: 1px solid transparent;
        border-radius: 4px;
        color: darken($alert-success-color, 60%);
        background-color: $alert-success-color;
        border-color: darken($alert-success-color, 10%);
        text-align: center;
        margin: 100px auto;
        max-width: 20%;
    }
}
</style>
