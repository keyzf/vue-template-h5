<!-- home -->
<template>
	<div class="mine-container">
		<div class="warpper">
			<div class="list">
				<div class="demo-home__title">VUE H5 开发模板</div>
				<div class="item">
					项目地址:
					<a target="_blank" href="https://github.com/zhangfeiv/vue-template-h5">
						https://github.com/zhangfeiv/vue-template-h5
					</a>
					<div class="tip">（聪明帅气的你赶紧点个star★吧）</div>
				</div>
				<div class="item">项目作者: {{ userName }}</div>
			</div>
		</div>
	</div>
</template>

<script>
// 请求接口
import { getUserInfo } from '@/api'
import { mapGetters } from 'vuex'
export default {
	computed: {
		...mapGetters('app', ['userName'])
	},
	mounted() {
		// this.initData()
	},
	methods: {
		// 请求数据案例
		initData() {
			// 请求接口数据，仅作为展示，需要配置src->config下环境文件
			const params = { user: 'zhangfei' }
			getUserInfo(params)
				.then(() => {})
				.catch(() => {})
		}
	}
}
</script>
<style lang="scss">
.mine-container {
	.warpper {
		padding: 200px 12px 0;
		.list {
			display: flex;
			flex-direction: column;
			align-items: center;
			color: #666;
			font-size: 14px;
			.demo-home__title {
				margin: 0 0 6px;
				font-size: 32px;
				.demo-home__title img,
				.demo-home__title span {
					display: inline-block;
					vertical-align: middle;
				}
			}
			.item {
				font-size: 14px;
				line-height: 26px;
				margin: 5px 0;
				a {
					text-decoration: underline;
				}
				.tip {
					text-align: center;
				}
			}
		}
	}
}
</style>
