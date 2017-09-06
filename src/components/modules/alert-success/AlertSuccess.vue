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

<style lang="scss" src="./alert-success.scss"></style>
