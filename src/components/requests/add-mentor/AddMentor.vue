<template>
    <div class="add-mentor">
        <alert-success :text="addMentor.success"/>
        <div class="add-mentor__title">Заявка на назначение наставника</div>
        <div class="add-mentor__container">
            <select-item
                class="add-mentor__container__select-item"
                placeholder="Введите имя сотрудника"
                :items="addMentor.itemsCollab"
                :selectedItem="addMentor.selectedCollab"
                :save="addMentor_selectCollab"
                :preload="addMentor_getCollabs"
                :loading="addMentor.collabsLoading"
                :isRequired="true"/>
            <select-item
                class="add-mentor__container__select-item"
                placeholder="Введите имя наставника"
                :items="addMentor.itemsMentor"
                :selectedItem="addMentor.selectedMentor"
                :save="addMentor_selectMentor"
                :preload="addMentor_getMentors"
                :loading="addMentor.mentorsLoading"
                :isRequired="true"/>
            <custom-button text="Назначить наставника" :action="addMentor_postMentor" :loading="addMentor.collabsLoading" :disabled="collabsEmpty"/>
            <alert-warning class="add-mentor__container__alert" :text="addMentor.error" :close="addMentor_closeError"/>
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
    name: "add-mentor",
    computed: {
        ...mapState([
            "addMentor"
        ]),

        collabsEmpty () {
            return _.isEqual(this.addMentor.selectedCollab, {}) || _.isEqual(this.addMentor.selectedMentor, {})
        }
    },
    methods: {
        ...mapMutations([
            "addMentor_selectCollab",
            "addMentor_selectMentor",
            "addMentor_closeError"
        ]),

        ...mapActions([
            "addMentor_getCollabs",
            "addMentor_getMentors",
            "addMentor_postMentor"
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

<style src="./add-mentor.scss" lang="scss" scoped></style>
