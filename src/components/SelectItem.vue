<template>
  <div class="select-container" v-on-clickaway="away">
    <div :class="[ 'select-arrow', {'select-arrow--select': selected} ]" @click="componentClick"></div>
    <div :class="[ 'select-tags', {'select-tags--select': selected} ]" @click="componentClick">
      <input
        type="text"
        :placeholder="placeholder"
        v-model="inputSelect"
        class="select-input"
        @keyup.delete="inputSelect = ''"
        @keyup="preload(inputSelect)"
        />
        <span v-show="loading" class="icon-spin4 animate-spin"></span>
    </div>
    <transition name="fade">
      <ul class="select-content" v-show="selected">
        <li class="select-item" v-for="item in items.items" @click="selectItem(item)">{{getTextInfo(item.info)}}</li>
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
        placeholder: { type: String, default: () => "Placeholder не задан" },
        selectedItem: { type: Object, default: () => { return {} } },
        items: { type: Object, default: () => { return { items: [] } } },
        save: { type: Function },
        preload: { type: Function },
        loading: { type: Boolean, default: false }
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
            this.selected = true
        }
    }
}
</script>

<style lang="scss" scoped>
$spiner-color: #2c820a;

  .select-container {
    box-sizing: content-box;
    display: block;
    width: 100%;
    min-height: 40px;
    text-align: left;
    position: relative;
    color: #35495e;
    margin-bottom: 16px;

    .select-tags {
        min-height: 40px;
        display: block;
        padding: 8px 40px 0 8px;
        border-radius: 5px;
        border: 1px solid #e8e8e8;
        box-sizing: border-box;

        &.select-tags--select {
            border-bottom-left-radius: 0px;
            border-bottom-right-radius: 0px;
        }
    }

    .select-input {
      position: relative;
      display: inline-block;
      font-family: sans-serif;
      width: 90%;
      min-height: 20px;
      line-height: 20px;
      border: none;
      border-radius: 5px;
      background: #fff;
      padding: 1px 0 0 5px;
      transition: border .1s ease;
      font-size: 14px;
      box-sizing: border-box;
      margin-bottom: 8px;
      color: inherit;
      outline: 0;
    }

    .icon-spin4 {
      float: right;
      font-size: 110%;
      color: $spiner-color;
    }

    .select-arrow {
      position: absolute;
      width: 40px;
      height: 38px;
      right: 1px;
      top: 1px;
      padding: 4px 8px;
      text-align: center;
      transition: transform .4s ease;
      box-sizing: border-box;
      cursor: pointer;
      transform-origin: center;

      &.select-arrow--select {
        transform: rotate(180deg);
      }

      &:before {
        position: relative;
        right: 0;
        top: 65%;
        color: #999;
        margin-top: 4px;
        border-style: solid;
        border-width: 5px 5px 0;
        border-color: #999 transparent transparent;
        content: "";
      }

    }

    .fade-enter-active, .fade-leave-active {
        transition: all .4s ease;
        overflow: hidden !important;
    }

    .fade-enter, .fade-leave-to {
        max-height: 0px !important;
    }

    .select-content {
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

        .select-item {
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
