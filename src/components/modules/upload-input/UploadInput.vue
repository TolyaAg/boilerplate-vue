<template>
    <div class="upload">
        <label class="upload__btn" for="file">Choose file to upload</label>
        <input  class="upload__input" 
            type="file" 
            id="file" 
            name="file" 
            :accept="acceptedTypes" 
            ref='input' 
            @change="onFileChange">
        <span class="upload__preview">{{fileName}}</span>
    </div>
</template>

<script>
    export default {
        name: "input-file",
        props: {
            fileTypes: { type: Array, default: () => [] },
            action: { type: Function, default: () => {} }
        },
        data () {
            return {
                file: null
            }
        },
        computed: {
            acceptedTypes () {
                return this.fileTypes.map(i => "." + i).join(", ")
            },
            fileName () {
                return (this.file ? this.file.name : "Файл не выбран")
            }
        },
        methods: {
            onFileChange () {
                const file = this.$refs.input.files[0]
                console.log(this.$refs.input.files[0])

                if (file.type.indexOf("pdf") === -1) {
                    console.log("this.file")
                    this.file = null
                    // вывести ошибку о неподходящем формате
                    return
                }

                this.file = file
                this.action(this.file)
            }
        },
        created () {
            // console.log(this.fileName)
        }
    }
</script>

<style src="./upload-input.scss" lang="scss" scoped></style>
