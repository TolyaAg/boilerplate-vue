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

<style lang="scss" src="./enter-reason-button.scss" scoped></style>
