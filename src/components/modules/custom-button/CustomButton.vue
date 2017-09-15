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
    data () {
        return {
            selected: false
        }
    },
    props: {
        text: { type: String, default: "" },
        action: { type: Function },
        loading: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false }
    },
    methods: {
    }
}
</script>

<style lang="scss" scoped src="./custom-button.scss"></style>
