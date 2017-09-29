<template>
    <div>
        <changeLibraryMaterial></changeLibraryMaterial>
        <!-- <not-study></not-study> -->
    </div>
</template>

<script>
import changeLibraryMaterial from "./components/requests/change-library"
// import NotStudy from "not-study"

export default {
    name: "app",
    components: {
        changeLibraryMaterial
    }
}
</script>

<style type="text/css" src="./styles/icons/css/merlion-fonts.css"></style>
<style type="text/css" src="./styles/icons/css/animation.css"></style>
<style type="text/css" src="./styles/normalize.css"></style>
<style type="text/css" src="./styles/common.scss"></style>
