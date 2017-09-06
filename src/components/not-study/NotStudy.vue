<template>
    <div class="not-study">
        <alert-success :text="notStudy.success"/>
        <div class="not-study__title">Контроль причин необученности сотрудников</div>
        <div class="not-study__container">
            <select-item
                class="not-study__container__select-item"
                title="Учебная программа:"
                placeholder="Введите название"
                :items="notStudy.itemsProgramm"
                :selectedItem="notStudy.selectedProgramm"
                :save="notStudy_selectProgramm"
                :preload="notStudy_getProgramms"
                :loading="notStudy.programmsLoading"
                :isRequired="true"/>
            <check-box class="not-study__container__checkbox" text="Показывать только с просрочкой" :value="notStudy.withDelay" :action="notStudy_changeDelay"/>
            <multi-select-items
                class="not-study__container__multi-select"
                placeholder="Введите регион"
                :items="notStudy.itemsRegion"
                :selectedItems="notStudy.selectedRegions"
                :save="notStudy_selectRegion"
                :preload="notStudy_getRegions"
                :loading="notStudy.regionsLoading"
                :remove="notStudy_removeRegion"/>
            <check-box class="not-study__container__checkbox" text="Показывать только с неуказанной причиной" :value="notStudy.withoutReason" :action="notStudy_changeReason"/><br/>
            <custom-button text="Показать сотрудников" :action="notStudy_getCollabs" :loading="notStudy.collabsLoading" :disabled="programmEmpty"/>
            <alert-warning class="not-study__container__alert" :text="notStudy.error" :close="notStudy_closeError"/>
            <transition name="not-study__container__items">
                <ul class="not-study__container__collabs-list" v-show="notStudy.collabs.length > 0 && !notStudy.collabsLoading">
                    <li v-for="collab in notStudy_collabsWithoutReason" :class="{ 'not-study__container__collabs-list__item--entered': collab.isEntered, 'not-study__container__collabs-list__item': true }">
                        <div class="not-study__container__collabs-list__item__item-name">
                            <a
                                :href="'http://study.merlion.ru/view_doc.html?mode=collaborator&object_id=' + collab.person_id"
                                target="_blank"
                                :style="{'text-decoration': 'none', cursor: 'pointer', color: 'inherit'}">
                                {{collab.info.name}}
                            </a>
                        </div><div class="not-study__container__collabs-list__item__item-delay">
                            {{collab.info.delay}}
                            <div :class="{
                                'not-study__container__collabs-list__item__item-delay__item-status': true, 
                                'not-study__container__collabs-list__item__item-delay__item-status--need-test': collab.status == 'need_test', 
                                'not-study__container__collabs-list__item__item-delay__item-status--not-delay': collab.status == 'not_delay', 
                                'not-study__container__collabs-list__item__item-delay__item-status--delay': collab.status == 'delay'}">
                            </div>
                        </div><div class="not-study__container__collabs-list__item__item-button">
                            <enter-reason-button
                                :text="collab.info.reason != '' || collab.isEntered ? 'Обновить причину' : 'Указать причину'"
                                :oldReason="collab.info.reason"
                                :adaptId="collab.id"
                                :action="openCommentWindow"/>
                        </div>
                    </li>
                </ul>
            </transition>
        </div>
        <transition name="not-study__modal">
            <div class="not-study__modal" v-show="enterComment">
                <div class="not-study__modal__enter-comment">
                    <div class="not-study__modal__enter-comment__title">
                        Укажите причину
                        <button class="not-study__modal__enter-comment__title__close-button" @click="closeCommentWindow">&times;</button>
                    </div>
                    <div class="not-study__modal__enter-comment__container">
                        <textarea 
                            readonly 
                            v-for="reason in notStudy_splitReasons" 
                            v-show="reason != ''" 
                            :value="reason.trim()" 
                            class="not-study__modal__enter-comment__container__textarea-readonly" title="Старые причины">
                        </textarea>
                        <textarea 
                            ref="reason" 
                            v-model="reason" 
                            class="not-study__modal__enter-comment__container__textarea-input" 
                            placeholder="Напишите причину">
                        </textarea>
                        <custom-button text="Внести причину" :action="enterReason" :disabled="reason.trim() == ''"/>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import MultiSelectItems from "multi-select-items"
import SelectItem from "select-item"
import CustomButton from "CustomButton"
import EnterReasonButton from "./enter-reason-button"
import AlertWarning from "alert-warning"
import AlertSuccess from "alert-success"
import CheckBox from "CheckBox"
import _ from "lodash"
import { mapState, mapMutations, mapActions, mapGetters } from "vuex"

export default {
    name: "not-study",
    data () {
        return {
            enterComment: false,
            reason: ""
        }
    },
    computed: {
        ...mapState([
            "notStudy"
        ]),

        ...mapGetters([
            "notStudy_splitReasons",
            "notStudy_collabsWithoutReason"
        ]),

        programmEmpty () {
            return _.isEqual(this.notStudy.selectedProgramm, {})
        }
    },
    methods: {
        ...mapMutations([
            "notStudy_selectProgramm",
            "notStudy_selectRegion",
            "notStudy_closeError",
            "notStudy_getSuccess",
            "notStudy_changeReason",
            "notStudy_changeDelay",
            "notStudy_removeRegion"
        ]),

        ...mapActions([
            "notStudy_getProgramms",
            "notStudy_getRegions",
            "notStudy_getCollabs",
            "notStudy_postReason"
        ]),

        openCommentWindow () {
            this.enterComment = true
            this.$refs.reason.focus()
        },

        closeCommentWindow () {
            this.reason = ""
            this.enterComment = false
        },

        enterReason () {
            this.notStudy_postReason(this.reason)
            this.enterComment = false
            this.reason = ""
        }
    },

    components: {
        SelectItem,
        CustomButton,
        AlertWarning,
        AlertSuccess,
        EnterReasonButton,
        CheckBox,
        MultiSelectItems
    }
}
</script>

<style src="./not_study.scss" lang="scss" scoped></style>
