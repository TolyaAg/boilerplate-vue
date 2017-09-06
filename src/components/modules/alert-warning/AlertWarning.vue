<template>
	<div class="alert" v-if="text != ''">
		{{ text }}
		<button class="alert__close-button" @click="close">&times;</button>
	</div>
</template>

<script>
export default {
    name: "alert-warning",
    props: {
        text: { type: String, default: "" },
        close: { type: Function }
    }
}
</script>

<style lang="scss" src="./alert-warning.scss" scoped></style>
