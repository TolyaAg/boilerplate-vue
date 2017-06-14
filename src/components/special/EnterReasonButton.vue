<template>
    <button 
        :class="[ 'custom-button', { 'custom-button--selected': selected } ]" 
        @click="click" 
        @mousedown="selected = true" 
        @mouseup="selected = false">
            {{ text }}
    </button>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
    name: "enter-reason-button",
    data() {
        return {
            selected: false
        }
    },
    props: {
        text: { type: String, default: '' },
        action: { type: Function },
        adaptId: { type: String, default: ''}
    },
    methods: {
        ...mapMutations([
            'selectAdapt'
        ]),
        click() {
            this.selectAdapt(this.adaptId);
            this.action();
        }
    }
}
</script>

<style lang="scss">
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