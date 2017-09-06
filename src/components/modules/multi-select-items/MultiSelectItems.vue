<template>
    <div class="multi-select" v-on-clickaway="away">
        <div :class="[ 'multi-select__arrow', {'multi-select__arrow--select': inputSelect.length > 2 && selected} ]" @click="arrowClick"></div>
        <div :class="[ 'multi-select__tags', {'multi-select__tags--select': selected, 'multi-select__tags--focus': focus} ]" @click.self="arrowClick">
            <span class="multi-select__tag" v-for="(item, index) in selectedItems">
                <span>{{item.info.name}}</span>
                <span class="multi-select__icon-cancel icon-cancel" @click.stop="removeItem(index)"/>
            </span>
            <input
                ref="input"
                type="text"
                :placeholder="placeholder"
                v-model="inputSelect"
                class="multi-select__input"
                @keyup.46="inputSelect = ''"
                @keyup="preload(inputSelect)"
                @click="componentClick"/>
            <span v-show="loading" class="multi-select__icon-spin4 icon-spin4 animate-spin"/>
        </div>
        <transition name="fade">
            <ul class="multi-select__content" v-show="inputSelect.length > 2 && selected">
                <li class="multi-select__item" v-for="item in filterItems" @click.stop="selectItem(item)">{{getTextInfo(item.info)}}</li>
            </ul>
        </transition>
    </div>
</template>

<script>
import { mixin as clickaway } from "vue-clickaway"
// import _ from "lodash"

export default {
    mixins: [clickaway],
    name: "multi-select-items",
    props: {
        placeholder: { type: String, default: "Placeholder не задан" },
        selectedItems: { type: Array, default: [] },
        items: { type: Array, default: [] },
        save: { type: Function, default: () => {} },
        preload: { type: Function, default: () => {} },
        loading: { type: Boolean, default: false },
        isRequired: { type: Boolean, default: false },
        remove: { type: Function, default: () => {} }
    },
    data () {
        return {
            selected: false,
            inputSelect: ""
        }
    },
    created () {
        this.preload(this.inputSelect)
    },
    computed: {
        focus () {
            return this.isRequired && this.inputSelect === ""
        },

        filterItems () {
            var isSelect = false
            const items = this.items.filter(item => {
                for (var i = 0; i < this.selectedItems.length; i++) {
                    if (item.id === this.selectedItems[i].id) {
                        isSelect = true
                        break
                    }
                    isSelect = false
                }
                return isSelect === false ? item : null
            })
            return items
        }
    },
    methods: {
        away () {
            this.selected = false
        },

        getTextInfo (info) {
            let text = ""
            for (const props in info) {
                text += info[props] + " "
            }
            return text
        },

        selectItem (item) {
            this.preload("")
            this.save(item)
            this.inputSelect = ""
            this.$refs.input.focus()
        },

        arrowClick () {
            this.selected = !this.selected
            this.$refs.input.focus()
        },

        componentClick () {
            this.selected = true
        },

        removeItem (index) {
            this.remove(index)
            this.$refs.input.focus()
        }
    }
}
</script>

<style lang="scss" src="./multi-select-items.scss" scoped></style>
