<template>
    <div class="time-picker" v-on-clickaway="away">
        <div :class="{'time-picker__container': true, 'time-picker__container--select': selected}" @click="selected = true">
            <span class="time-picker__container__icon-calendar icon-calendar"></span>
            <input class="time-picker__container__input" @keyup="interNum($event)" v-model="strTime" :placeholder="placeholder + ' (ЧЧ:ММ)'" type="text">
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
        },
        interNum (event) {
            if (event.keyCode !== 8) {
                this.strTime = this.strTime.length > 5 ? this.strTime.substr(0, this.strTime.length - 1) : this.strTime
                this.strTime = /[A-Za-zА-Яа-я]/.test(this.strTime) ? this.strTime.substr(0, this.strTime.length - 1) : this.strTime
                this.strTime = this.strTime.length === 2 && Number(this.strTime) > 23 ? this.strTime.substr(0, this.strTime.length - 1) : this.strTime
                this.strTime = this.strTime.length === 2 ? this.strTime += ":" : this.strTime
                this.strTime = this.strTime.length === 5 && Number(this.strTime.substr(3)) > 59 ? this.strTime.substr(0, this.strTime.length - 1) : this.strTime
            }
        }
    }
}
</script>

<style lang="scss" scoped src="./time-input.scss"></style>
