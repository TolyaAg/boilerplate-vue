<template>
    <div class="time-picker" v-on-clickaway="away">
        <div :class="{'time-picker__container': true, 'time-picker__container--select': selected}" @click="selected = !selected">
            <span class="time-picker__container__icon-calendar icon-calendar"></span>
            <input class="time-picker__container__input" readonly :value="textTime" :placeholder="placeholder" type="text">
        </div>
        <transition name="time-picker__lists">
            <div class="time-picker__time-panel" v-show="selected">
                <ul class="time-picker__time-panel__hours">
                    <li class="time-picker__time-panel__hours__item" v-for="hour in 24">{{hour}}</li>
                </ul><ul class="time-picker__time-panel__minutes">
                    <li class="time-picker__time-panel__minutes__item" v-for="minutes in 60" v-show="minutes % 5 === 0">{{minutes}}</li>
                </ul>
            </div>
        </transition>
    </div>
</template>

<script>
import { mixin as clickaway } from "vue-clickaway"

export default {
    mixins: [clickaway],
    name: "time-picker",
    props: {
        placeholder: { type: String, default: "Выберите время" },
        time: { type: Date, default: null }
    },
    data () {
        return {
            selected: false
        }
    },
    methods: {
        away () {
            this.selected = false
        }
    },
    computed: {
        textTime () {
            if (this.time === null) {
                return ""
            }
            return this.time.getHours() + ":" + this.time.getMinutes()
        }
    }
}
</script>

<style lang="scss" scoped>
.time-picker {
    box-sizing: content-box;
    display: block;
    width: 200px;
    min-height: 40px;
    text-align: left;
    position: relative;
    color: #35495e;
    cursor: pointer;

    &__container {
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

        &__icon-calendar {
            margin-left: 7px;
            position: absolute;
            right: 10px;
            top: 10px;
            bottom: 0;
            font-weight: 700;
            font-style: normal;
            width: 22px;
            line-height: 22px;
            transition: all .2s ease;
            border-radius: 5px;
            color: #999;
        }

        &__input {
            cursor: pointer;
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
            margin-bottom: 8px;
            color: inherit;
            outline: 0;
        }
    }

    &__lists-enter-active, &__lists-leave-active {
        transition: max-height .4s ease;
        overflow: hidden !important;
    }

    &__lists-enter, &__lists-leave-to {
        max-height: 0px !important;
    }

    &__time-panel {
        max-height: 150px;
        position: absolute;
        z-index: 10;
        width: 100%;
        box-sizing: border-box;

        &:before {
            position: absolute;
            content: ":";
            top: 35%;
            font-size: 25px;
            left: 0;
            right: 0;
            text-align: left;
            margin-left: 50%;
            z-index: 4;
            margin-right: 50%;
        }

        &__hours {
            position: relative;
            list-style: none;
            background: #fff;
            width: 50%;
            overflow: auto;
            padding: 0;
            margin: 0 !important;
            border: 1px solid #e8e8e8;
            border-top: none;
            border-bottom-left-radius: 5px;
            box-sizing: border-box;
            border-right: 0px;
            display: inline-block;
            max-height: inherit;

            &__item {
                display: block;
                //padding: 12px;
                min-height: 26px;
                line-height: 26px;
                text-decoration: none;
                text-transform: none;
                vertical-align: middle;
                text-align: center;
                cursor: pointer;
                white-space: nowrap;
                box-sizing: border-box;
                font-size: 16px;

                &:hover {
                    background: #20a0ff;
                    color: #fff;
                }
            }
        }

        &__minutes {
            position: relative;
            list-style: none;
            background: #fff;
            width: 50%;
            overflow: auto;
            padding: 0;
            margin: 0 !important;
            border: 1px solid #e8e8e8;
            border-top: none;
            border-bottom-right-radius: 5px;
            box-sizing: border-box;
            border-left: 0px;
            display: inline-block;
            max-height: inherit;

            &__item {
                display: block;
                //padding: 12px;
                min-height: 26px;
                line-height: 26px;
                text-decoration: none;
                text-transform: none;
                vertical-align: middle;
                text-align: center;
                cursor: pointer;
                white-space: nowrap;
                box-sizing: border-box;
                font-size: 16px;
                margin-left: 6px;

                &:hover {
                    background: #20a0ff;
                    color: #fff;
                }
            }
        }
    }
}
</style>
