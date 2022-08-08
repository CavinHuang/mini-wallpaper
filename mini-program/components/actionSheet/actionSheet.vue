/**
* props: String:?title Boolean:show
* event: close
* slot : <template />
*/
<template>
	<view :class="['action-sheet',  show ? 'action-sheet__active' : '']">
		<view class="action-sheet-mask" @click="close"></view>
		<view class="action-sheet-container">
			<view class="action-sheet-header" v-if="title">
				<text>{{title}}</text>
			</view>
			<view class="action-sheet-body">
				<slot></slot>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name: 'ActionSheet',
		props: {
			title: {
				default: '',
				type: String
			},
			show: {
				default: false,
				type: Boolean
			}
		},
		methods: {
			close() {
				this.$emit('close')
			}
		}
	}
</script>
<style>
	.action-sheet {
		width: 100%;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99999;
		visibility: hidden;
		transition: visibility 300ms cubic-bezier(0.36, 0.66, 0.04, 1);
		-webkit-transition: visibility 300ms cubic-bezier(0.36, 0.66, 0.04, 1);
	}

	.action-sheet .action-sheet-mask {
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		position: absolute;
		background-color: rgba(0, 0, 0, 0.3);
		opacity: 0;
		transition: opacity 300ms ease-in;
	}

	.action-sheet .action-sheet-container {
		width: 100%;
		min-height: 600upx;
		max-height: 780upx;
		position: absolute;
		bottom: 0;
		display: flex;
		flex-direction: column;
		transform: translate3d(0, 100%, 0);
		transition: transform 300ms cubic-bezier(0.36, 0.66, 0.04, 1);
	}

	.action-sheet .action-sheet-container .action-sheet-header {
		height: 88upx;
		box-sizing: border-box;
		padding: 0.512rem;
		color: #b2b2b2;
		font-size: 28upx;
		text-align: center;
		line-height: 1.5;
		position: relative;
		background-color: #fff;
		display: block;
	}

	.action-sheet .action-sheet-container .action-sheet-header text {
		font-size: 32rpx;
	}

	.action-sheet .action-sheet-container .action-sheet-header:after {
		border: 0 solid #d6e4ef;
		-webkit-transform: scale(0.5);
		transform: scale(0.5);
		border-bottom-width: 1PX;
		top: -50%;
		left: -50%;
		right: -50%;
		bottom: -50%;
		content: '';
		position: absolute;
		-webkit-transform-origin: center;
		transform-origin: center;
		box-sizing: border-box;
		pointer-events: none;
	}

	.action-sheet .action-sheet-container .action-sheet-body {
		background-color: #fff;
		flex: 1;
	}

	.action-sheet__active {
		visibility: visible;
	}

	.action-sheet__active .action-sheet-mask {
		opacity: 1;
	}

	.action-sheet__active .action-sheet-container {
		transform: translate3d(0, 0, 0);
	}
</style>
