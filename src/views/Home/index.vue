<!-- home -->
<template>
	<div class="index-container">
		<div class="warpper">
			<h1 class="demo-home__title">VUE H5开发模板</h1>
			<div></div>
			<div class="demo-home__desc">
				A vue h5 template with Vant UI
			</div>
		</div>

		<van-cell icon="success" v-for="item in list" :key="item" :title="item" />
	</div>
</template>

<script>
export default {
	data() {
		return {
			list: [
				'Sass 全局样式',
				'VantUI 组件按需加载',
				'Vuex 状态管理',
				'Axios 封装及接口管理',
				'Vue-router 路由配置',
				'proxy 跨域配置',
				'cdn externals 配置',
				'多环境变量配置',
				'Webpack 4 vue.config.js 基础配置',
				'Eslint+Pettier 统一开发规范',
				'Vue-router 路由配置',
				'proxy 跨域配置',
				'cdn externals 配置',
				'多环境变量配置',
				'Webpack 4 vue.config.js 基础配置',
				'Eslint+Pettier 统一开发规范'
			]
		}
	}
}
</script>
<style lang="scss" scoped>
.index-container {
	background: #fff;
	.warpper {
		.demo-home__title {
			font-size: 32px;
			font-weight: 500;
			text-align: center;
			padding-top: 20px;
			padding-bottom: 5px;
			color: #666;
		}
		.demo-home__desc {
			color: rgba(69, 90, 100, 0.6);
			font-size: 14px;
			text-align: center;
			padding-bottom: 10px;
		}
	}
}
</style>
