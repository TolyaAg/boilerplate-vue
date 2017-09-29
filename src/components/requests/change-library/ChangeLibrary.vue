<template>
  <div class="component-wrapper change-kb">
      <alert-success :text="library.success"/>
      <div class="component-title change-kb__title">Замена материала в библиотеке знаний</div>
      <div class="component-container change-kb__container">
            <!-- <form id="upload" 
                method="POST" 
                action="http://study.merlion.ru/custom_web_template.html?object_id=6385385939497347608&server_id=6468529359339792313&server_name=changeLibMaterial&action_name=Materials"> -->
                <select-item 
                    class="change-kb__input" 
                    title="Материал библиотеки"
                    placeholder="Введите название"
                    :items="library.itemsLibrary"
                    :selectedItem="library.selectedLibrary"
                    :preload="library_getMaterials"
                    :save="library_selectMaterial"
                    :isRequired="true">
                </select-item>  
                <input type="hidden" :value="materialID" name="material_id">
                <upload class="change-kb__upload"
                    :fileTypes="fileTypes"
                    :action="library_changeFile"></upload>
                <custom-button text="Сохранить" 
                    :action="fileUpload"
                    :disabled="fileEmpty"/>
            <!-- </form> -->
      </div>
  </div>
</template>

<script>
import _ from "lodash"
import { mapState, mapMutations, mapActions } from "vuex"

import SelectItem from "select-item"
import Upload from "upload-input"
import CustomButton from "custom-button"
import AlertSuccess from "alert-success"

export default {
    name: "changeLibrary",
    data () {
        return {
            file: null,
            fileTypes: ["pdf", "jpg", "png"]
        }
    },
    computed: {
        ...mapState([
            "library"
        ]),
        fileEmpty () {
            return !(this.library.selectedFile !== null && !_.isEqual(this.library.selectedLibrary, {}))
        },
        materialID () {
            return this.library.selectedLibrary ? this.library.selectedLibrary.id : ""
        }
    },
    methods: {
        ...mapMutations([
            "library_getMaterials",
            "library_selectMaterial",
            "library_changeFile",
            "library_getSuccess",
            "library_getError",
            "library_closeError",
            "library_materialLoading",
            "library_sendDataLoading",
            "library_clearStore"
        ]),

        ...mapActions([
            "library_getMaterials",
            "library_changeMaterial"
        ]),

        fileUpload () {
            // console.log("send")
            this.library_changeMaterial()
        }
    },
    mounted () {
        // console.log(this.fileEmpty)
    },

    components: {
        SelectItem,
        Upload,
        CustomButton,
        AlertSuccess
    }
}
</script>

<style src="./change-library.scss" lang="scss" scoped></style>
