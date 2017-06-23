<template>
    <div id="app" class="app">
        <alert-success :text="success"/>
        <div class="title">Контроль причин необученности сотрудников</div>
        <div class="container">
            <select-item 
                placeholder="Выберите учебную программу" 
                :items="itemsProgramm" 
                :selectedItem="selectedProgramm" 
                :save="selectProgramm" 
                :preload="getProgramms"
                :loading="programmsLoading"/>
            <select-item 
                placeholder="Выберите регион" 
                :items="itemsRegion" 
                :selectedItem="selectedRegion" 
                :save="selectRegion" 
                :preload="getRegions"
                :loading="regionsLoading"/>
            <custom-button text="Показать сотрудников" :action="getCollabs" :loading="collabsLoading"/>
            <alert-warning :text="error" :close="closeError"/>
            <transition name="items">
                <ul class="container__collabs-list" v-show="collabs.length > 0 && !collabsLoading">
                    <li v-for="collab in collabs" :class="{ 'collabs-list__item-entered': collab.isEntered, 'collabs-list__item': true }">
                        <div :style="{width: 100 / 3 + '%', display: 'inline-block', margin: '8px 0', text-align: 'left'}">
                            {{collab.info.name}}
                        </div>
                        <div :style="{width: 100 / 3 - 1 + '%', display: 'inline-block', margin: '8px 0'}">
                            {{collab.info.delay}}
                        </div>
                        <div :style="{width: 100 / 3 + '%', display: 'inline-block', margin: '8px 0'}">
                            <enter-reason-button text="Указать причину" :oldReason="collab.info.reason" :adaptId="collab.id" :action="openCommentWindow"/>
                        </div>
                    </li>
                </ul>
            </transition>
        </div>
        <transition name="modal">
            <div class="modal" v-show="enterComment">
                <div class="modal__enter-comment">
                    <div class="modal__enter-comment__title">
                        Укажите причину
                        <button class="close-button" @click="closeCommentWindow">&times;</button>
                    </div>
                    <div class="modal__enter-comment__container">
                        <textarea readonly v-for="reason in splitReasons" v-show="reason != ''" :value="reason.trim()" class="textarea-readonly" title="Старые причины"></textarea>
                        <textarea v-model="reason" autofocus="true" class="textarea-input" placeholder="Напишите причину"></textarea>
                        <custom-button text="Внести причину" :action="enterReason"/>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import SelectItem from './components/SelectItem';
import CustomButton from './components/CustomButton';
import EnterReasonButton from './components/special/EnterReasonButton';
import AlertWarning from './components/AlertWarning';
import AlertSuccess from './components/AlertSuccess';
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';

export default {
    name: 'app',
    data () {
        return {
            enterComment: false,
            reason: ''
        }
    },
    computed: {
        ...mapState([
            'selectedProgramm',
            'itemsProgramm',
            'selectedRegion',
            'itemsRegion',
            'error',
            'success',
            'collabs',
            'oldReason',
            'collabsLoading',
            'regionsLoading',
            'programmsLoading'
        ]),

        ...mapGetters([
            'splitReasons'
        ])
    },
    methods: {
        ...mapMutations([
            'selectProgramm',
            'selectRegion',
            'closeError',
            'getSuccess'
        ]),

        ...mapActions([
            'getProgramms',
            'getRegions',
            'getCollabs',
            'postReason'
        ]),

        openCommentWindow() {
            this.enterComment = true;
        },

        closeCommentWindow() {
            this.reason = '';
            this.enterComment = false;
        },

        enterReason() {
            this.postReason(this.reason);
            this.enterComment = false;
            this.reason = '';
        }
    },

    components: {
        SelectItem,
        CustomButton,
        AlertWarning,
        AlertSuccess,
        EnterReasonButton
    }
}
</script>

<style src="./styles/styles.scss" lang="scss"></style>
<style src="./styles/font/css/merlion-fonts.css"></style>
<style src="./styles/font/css/animation.css"></style>

<style lang="scss" scoped>

.items-enter-active, .items-leave-active {
    transition: all .5s ease-in-out;
}

.items-enter, .items-leave-to /* .fade-leave-active для <2.1.8 */ {
    max-height: 0px !important;
}

.container {
    padding: 8px;
    transition: max-height .8s ease-in-out;
    position: relative;

    .container__collabs-list {
        overflow: auto;
        list-style: none;
        padding: 0;
        width: 100%;
        background: #fff;
        color: #35495e;
        max-height: 460px;
        margin: 16px 0;

        .collabs-list__item {
            text-align: center;
            border: 0px;
            border-radius: 4px;

            &:hover {
                color: #fff;
                background-color: #999;
            }
        }

        .collabs-list__item-entered {
            color: #fff;
            background-color: #999;
        }
    }
}

.modal__enter-comment {
    width: 50%;
    background-color: #fff;
    margin: 20% auto;
    box-shadow: 2px 2px 10px 0 #646464;
    border-radius: 5px;
    border: 0;

    .modal__enter-comment__title {
        background-color: #646464;
        color: #fff;
        padding: 10px 0 10px 8px;
        font-size: 14px;
    }

    .modal__enter-comment__container {
        padding: 8px;

        .textarea-input {
            width: 100%;
            box-sizing: border-box;
            resize: none;
            outline: 0;
            border-radius: 4px;
            min-height: 150px;
            margin-bottom: 8px;
            font-family: sans-serif;
            overflow: hidden;
            border-width: 1px;
            border-color: #a9a9a9;
        }

        .textarea-readonly {
            width: 100%;
            box-sizing: border-box;
            resize: none;
            outline: 0;
            border-radius: 4px;
            margin-bottom: 8px;
            font-family: sans-serif;
            overflow: hidden;
            border-width: 1px;
            border-color: #a9a9a9;
        }
    }
}
</style>
