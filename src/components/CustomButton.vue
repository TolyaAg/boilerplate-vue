<template>
    <button 
        :class="[ 'custom-button', { 'custom-button--selected': selected } ]" 
        @click="action" 
        @mousedown="selected = true" 
        @mouseup="selected = false">
            {{ text }}
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
        action: { type: Function }
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

    &.custom-button--selected {
        border: 1px solid darken($button-primary-color, 30%);
        background-color: darken($button-primary-color, 20%);
    }
}
</style>