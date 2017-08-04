<template>
    <button
        :class="[ 'custom-button', { 'custom-button--selected': selected } ]"
        @click="click"
        @mousedown="selected = true"
        @mouseup="selected = false">
            {{ text }}
            <span class="icon-edit"></span>
    </button>
</template>

<script>
import { mapMutations } from "vuex"

export default {
    name: "enter-reason-button",
    data () {
        return {
            selected: false
        }
    },
    props: {
        text: { type: String, default: "" },
        action: { type: Function },
        adaptId: { type: String, default: "" },
        oldReason: { type: String, default: "" }
    },
    methods: {
        ...mapMutations([
            "notStudy_selectAdapt"
        ]),
        click () {
            const { adaptId, oldReason } = this
            this.notStudy_selectAdapt({ adaptId, oldReason })
            this.action()
        }
    }
}
</script>

<style lang="scss" scoped>
$button-primary-color: #ff5252;

.custom-button {
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
    line-height: normal;
    font-size: 13px;

    &--selected {
        border: 1px solid darken($button-primary-color, 30%);
        background-color: darken($button-primary-color, 20%);
    }

    &--disabled {
        background-color: #bababa !important;
        border: 1px solid darken(#bababa, 10%) !important;
    }
}
</style>
