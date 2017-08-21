<template>
    <div class="select-item" v-on-clickaway="away">
        <div :class="[ 'select-item__arrow', {'select-item__arrow--select': selected} ]" @click="componentClick"></div>
        <div :class="[ 'select-item__tags', {'select-item__tags--select': selected, 'select-item__tags--focus': focus} ]" @click="componentClick">
            <div class="select-item__tags__label">{{title}}</div>
            <input
                type="text"
                :placeholder="placeholder"
                v-model="inputSelect"
                class="select-item__tags__input"
                @keyup.46="inputSelect = ''"
                @keyup="newInput()"/>
            <span v-show="loading" class="select-item__tags__icon-spin4 icon-spin4 animate-spin"></span>
        </div>
        <transition name="select-item__fade">
            <ul class="select-item__content" v-show="inputSelect.length > 2 && selected === true">
                <li class="select-item__content__item" v-for="item in items" @click="selectItem(item)">{{getTextInfo(item.info)}}</li>
            </ul>
        </transition>
    </div>
</template>

<script>
import { mixin as clickaway } from "vue-clickaway"
import _ from "lodash"

export default {
    mixins: [clickaway],
    name: "select-item",
    props: {
        placeholder: { type: String, default: "Placeholder не задан" },
        title: { type: String, default: "Title не задан" },
        selectedItem: { type: Object, default: () => {} },
        items: { type: Array, default: () => [] },
        save: { type: Function, default: () => {} },
        preload: { type: Function, default: () => {} },
        loading: { type: Boolean, default: false },
        isRequired: { type: Boolean, default: false }
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
        }
    },
    watch: {
        selectedItem () {
            if (_.isEqual(this.selectedItem, {})) {
                this.inputSelect = ""
                this.preload(this.inputSelect)
            }
        }
    },
    methods: {
        away () {
            if (_.isEqual(this.selectedItem, {})) {
                this.inputSelect = ""
            } else if (this.inputSelect === "") {
                this.save({})
            } else if (this.inputSelect !== this.selectedItem.info.name) {
                this.inputSelect = this.selectedItem.info.name
            }

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
            this.save(item)
            this.selected = false
            this.inputSelect = item.info.name
            setTimeout(() => { this.preload(this.inputSelect) }, 500)
        },

        componentClick () {
            this.selected = !this.selected
        },

        newInput () {
            this.preload(this.inputSelect)
            this.selected = true
        }
    }
}
</script>

<style lang="scss" scoped>
$spiner-color: #2c820a;

.select-item {
    box-sizing: content-box;
    display: block;
    width: 100%;
    min-height: 40px;
    text-align: left;
    position: relative;
    color: #35495e;

    &__tags {
        min-height: 40px;
        display: block;
        padding: 8px 40px 0 8px;
        border-radius: 5px;
        border: 1px solid #e8e8e8;
        box-sizing: border-box;
        transition: border-color .4s ease;

        &--select {
            border-bottom-left-radius: 0px;
            border-bottom-right-radius: 0px;
        }

        &--focus {
            border-color: rgba(255, 0, 0, 0.5);
        }

        &__label {
            display: inline-block;
            font-family: sans-serif;
            font-size: 14px;
        }

        &__input {
            position: relative;
            display: inline-block;
            font-family: sans-serif;
            width: 100%;
            min-height: 20px;
            line-height: 20px;
            border: none;
            border-radius: 5px;
            background: #fff;
            padding: 1px 0 0 5px;
            transition: border .1s ease;
            font-size: 14px;
            box-sizing: border-box;
            margin-bottom: 4px;
            color: inherit;
            outline: 0;
        }

        &__icon-spin4 {
            float: right;
            font-size: 110%;
            color: $spiner-color;
        }
    }

    &__arrow {
        position: absolute;
        width: 40px;
        height: 100%;
        right: 1px;
        top: 1px;
        padding: 4px 8px;
        text-align: center;
        transition: transform .4s ease;
        box-sizing: border-box;
        cursor: pointer;
        transform-origin: center;

        &--select {
            transform: rotate(180deg);
        }

        &:before {
            position: relative;
            right: 0;
            top: 55%;
            color: #999;
            margin-top: 4px;
            border-style: solid;
            border-width: 5px 5px 0;
            border-color: #999 transparent transparent;
            content: "";
        }
    }

    &__fade-enter-active, &__fade-leave-active {
        transition: all .4s ease;
        overflow: hidden !important;
    }

    &__fade-enter, &__fade-leave-to {
        max-height: 0px !important;
    }

    &__content {
        max-height: 300px;
        position: absolute;
        list-style: none;
        background: #fff;
        width: 100%;
        overflow: auto;
        padding: 0;
        margin: 0;
        border: 1px solid #e8e8e8;
        border-top: none;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        z-index: 2;
        box-sizing: border-box;

        &__item {
            display: block;
            padding: 12px;
            min-height: 40px;
            line-height: 16px;
            text-decoration: none;
            text-transform: none;
            vertical-align: middle;
            position: relative;
            cursor: pointer;
            white-space: nowrap;
            box-sizing: border-box;
            font-size: 14px;

            &:hover {
                background: #20a0ff;
                color: #fff;
            }
        }
    }
}
</style>
