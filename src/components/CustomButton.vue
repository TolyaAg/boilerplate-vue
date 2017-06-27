<template>
    <button
        :class="{'custom-button': true, 'custom-button--selected': selected, 'custom-button--disabled': disabled}" 
        @click="action"
        @mousedown="selected = true"
        @mouseup="selected = false"
        :disabled="disabled">
            <span v-show="!loading">{{ text }}</span>
            <span v-show="loading" class="icon-spin4 animate-spin"></span>
            <span v-show="loading">Загрузка</span>
    </button>
</template>

<script>
export default {
    name: "custom-button",
    data() {
        return {
            selected: false
        }
    },
    props: {
        text: { type: String, default: '' },
        action: { type: Function },
        loading: { type: Boolean, default: false},
        disabled: { type: Boolean, default: false}
    },
    methods: {
    }
}
</script>

<style lang="scss" scoped>
$button-primary-color: #ff5252;

.custom-button {
 //    position: relative;
 //    display: inline-block;
    padding: .5em;
    border-radius: 2px;
    text-align: center;
    cursor: pointer;
    outline: 0;
    vertical-align: middle;
    background-color: $button-primary-color;
    border: 1px solid darken($button-primary-color, 10%);
    color: #fff;
    transition: all .2s;
    min-width: 155px;

    &.custom-button--selected {
        border: 1px solid darken($button-primary-color, 30%);
        background-color: darken($button-primary-color, 20%);
    }

    &.custom-button--disabled {
        background-color: #bababa !important;
        border: 1px solid darken(#bababa, 10%) !important;
    }
}
</style>
