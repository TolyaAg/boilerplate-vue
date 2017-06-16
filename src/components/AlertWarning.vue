<template>
	<div class="alert" v-if="text != ''">
		{{ text }}
		<button class="close-button" @click="close">&times;</button>
	</div>
</template>

<script>
	export default {
		name:'alert-warning',
		props: {
			text: { type: String, default: '' },
			close: { type: Function }
		}
	}
</script>

<style lang="scss" scoped>
$alert-danger-color: #f2dede;

	.alert {
		padding: 8px;
		border: 1px solid transparent;
		border-radius: 4px;
		color: darken($alert-danger-color, 60%);
        background-color: $alert-danger-color;
        border-color: darken($alert-danger-color, 10%);
        margin: 8px 0;

        .close-button {
			outline: 0;
			margin-top: -2px;
			padding: 0 0 0 8px;
			cursor: pointer;
			background: 0 0;
			border: 0;
			/* padding: 8px; */
			float: right;
			font-size: 21px;
			font-weight: 700;
			line-height: 1;
			color: #000;
			text-shadow: 0 1px 0 #fff;
			filter: alpha(opacity=20);
			opacity: .2;
        }
	}
</style>