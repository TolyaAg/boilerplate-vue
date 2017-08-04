<template>
    <div class="time-picker" v-on-clickaway="away">
        <div :class="{'time-picker__container': true, 'time-picker__container--select': selected}" @click="selected = true">
            <span class="time-picker__container__icon-calendar icon-calendar"></span>
            <input class="time-picker__container__input" v-model="strTime" :placeholder="placeholder + ' (ЧЧ:ММ)'" type="text">
        </div>
    </div>
</template>

<script>
import { mixin as clickaway } from "vue-clickaway"

export default {
    mixins: [clickaway],
    name: "time-input",
    props: {
        placeholder: { type: String, default: "Введите время" },
        time: { type: String, default: "" }
    },
    data () {
        return {
            strTime: "",
            selected: false
        }
    },
    methods: {
        away () {
            this.selected = false
        }
    },
    watch: {
        strTime () {
            if (/[A-Za-zА-Яа-я]/.test(this.strTime)) {
                this.strTime = this.strTime.substr(0, this.strTime.length - 1)
            } else if (this.strTime.length === 2 && Number(this.strTime) > 24) {
                this.strTime = this.strTime.substr(0, this.strTime.length - 1)
            } else if (this.strTime.length === 2) {
                this.strTime += ":"
            } else if (this.strTime.length === 5 && Number(this.strTime.substr(3)) > 60) {
                this.strTime = this.strTime.substr(0, this.strTime.length - 1)
            } else if (this.strTime.length > 5) {
                this.strTime = this.strTime.substr(0, this.strTime.length - 1)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.time-picker {
    box-sizing: content-box;
    display: block;
    max-width: 250px;
    min-height: 40px;
    text-align: left;
    position: relative;
    color: #35495e;

    &__container {
        min-height: 40px;
        display: block;
        padding: 8px 40px 0 8px;
        border-radius: 5px;
        border: 1px solid #e8e8e8;
        box-sizing: border-box;
        transition: border-color .4s ease;

        &--select {
            border-color: #20a0ff;
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
            text-align: center;
        }
    }
}
</style>
