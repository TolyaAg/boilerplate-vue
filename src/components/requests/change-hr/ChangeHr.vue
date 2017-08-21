<template>
    <div class="change-hr">
        <alert-success :text="changeHr.success"/>
        <div class="change-hr__title">Заявка на смену ответственного менеджера по персоналу в регионе</div>
        <div class="change-hr__container">
            <select-item
                title="Заменяемый менеджер по персоналу"
                class="change-hr__container__select-item"
                placeholder="Введите имя"
                :items="changeHr.itemsReplaceable"
                :selectedItem="changeHr.selectedReplaceable"
                :save="changeHr_selectReplaceable"
                :preload="changeHr_getReplaceables"
                :loading="changeHr.collabsLoading"
                :isRequired="true"/>
            <select-item
                title="Заменяющий менеджер по персоналу"
                class="change-hr__container__select-item"
                placeholder="Введите имя"
                :items="changeHr.itemsReplacing"
                :selectedItem="changeHr.selectedReplacing"
                :save="changeHr_selectReplacing"
                :preload="changeHr_getReplacings"
                :loading="changeHr.mentorsLoading"
                :isRequired="true"/>
            <custom-button text="Назначить ответственного" :action="changeHr_postReplacings" :loading="changeHr.collabsLoading" :disabled="collabsEmpty"/>
            <alert-warning class="change-hr__container__alert" :text="changeHr.error" :close="changeHr_closeError"/>
        </div>
    </div>
</template>

<script>
import SelectItem from "SelectItem"
import CustomButton from "CustomButton"
import AlertWarning from "AlertWarning"
import AlertSuccess from "AlertSuccess"
import _ from "lodash"
import { mapState, mapMutations, mapActions } from "vuex"

export default {
    name: "change-hr",
    computed: {
        ...mapState([
            "changeHr"
        ]),

        collabsEmpty () {
            return _.isEqual(this.changeHr.selectedReplaceable, {}) || _.isEqual(this.changeHr.selectedReplacing, {})
        }
    },
    methods: {
        ...mapMutations([
            "changeHr_selectReplaceable",
            "changeHr_selectReplacing",
            "changeHr_closeError"
        ]),

        ...mapActions([
            "changeHr_getReplaceables",
            "changeHr_getReplacings",
            "changeHr_postReplacings"
        ])
    },

    components: {
        SelectItem,
        CustomButton,
        AlertWarning,
        AlertSuccess
    }
}
</script>

<style src="./change-hr.scss" lang="scss" scoped></style>
