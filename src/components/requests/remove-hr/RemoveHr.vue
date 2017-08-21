<template>
    <div class="remove-hr">
        <alert-success :text="removeHr.success"/>
        <div class="remove-hr__title">Заявка на выход из отпуска</div>
        <div class="remove-hr__container">
            <select-item
                title="Менеджер по персоналу пришедший из отпуска"
                class="remove-hr__container__select-item"
                placeholder="Введите имя"
                :items="removeHr.itemsReplaceable"
                :selectedItem="removeHr.selectedReplaceable"
                :save="removeHr_selectReplaceable"
                :preload="removeHr_getReplaceables"
                :loading="removeHr.collabsLoading"
                :isRequired="true"/>
            <select-item
                title="Заменяющий менеджер по персоналу"
                class="remove-hr__container__select-item"
                placeholder="Введите имя"
                :items="removeHr.itemsReplacing"
                :selectedItem="removeHr.selectedReplacing"
                :save="removeHr_selectReplacing"
                :preload="removeHr_getReplacings"
                :loading="removeHr.mentorsLoading"
                :isRequired="true"/>
            <custom-button text="Отменить назначение" :action="removeHr_postReplacings" :loading="removeHr.requestLoading" :disabled="collabsEmpty"/>
            <alert-warning class="remove-hr__container__alert" :text="removeHr.error" :close="removeHr_closeError"/>
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
        name: "remove-hr",
        computed: {
            ...mapState([
                "removeHr"
            ]),

            collabsEmpty () {
                return _.isEqual(this.removeHr.selectedReplaceable, {}) || _.isEqual(this.removeHr.selectedReplacing, {})
            }
        },
        methods: {
            ...mapMutations([
                "removeHr_selectReplaceable",
                "removeHr_selectReplacing",
                "removeHr_closeError"
            ]),

            ...mapActions([
                "removeHr_getReplaceables",
                "removeHr_getReplacings",
                "removeHr_postReplacings"
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

<style src="./remove-hr.scss" lang="scss" scoped></style>
