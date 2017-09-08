<template lang="html">
    <label class="checkbox">
        <span class="checkbox__input" @click="action">
            <span :class="{'checkbox__inner': true, 'checkbox__inner--checked': value}"></span>
        </span>
        <span class="checkbox__label" @click="action">{{text}}</span>
    </label>
</template>

<script>
export default {
    name: "checkbox",
    props: {
        text: { type: String, default: "" },
        value: { type: Boolean, default: false },
        action: { type: Function }
    }
}
</script>

<style lang="scss" src="./check-box.scss" scoped></style>
