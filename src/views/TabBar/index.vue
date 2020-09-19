<template>
	<div class="app-container">
		<div class="layout-content">
			<keep-alive v-if="$route.meta.keepAlive">
				<router-view></router-view>
			</keep-alive>
			<router-view v-else></router-view>
		</div>
		<div class="layout-footer">
			<van-tabbar fixed route placeholder v-model="active" @change="handleChange">
				<van-tabbar-item v-for="(item, index) in tabbars" :to="item.to" :icon="item.icon" :key="index">
					{{ item.title }}
				</van-tabbar-item>
			</van-tabbar>
		</div>
	</div>
</template>

<script>
export default {
	name: 'AppLayout',
	data() {
		return {
			tabbars: [
				{
					title: '首页',
					to: {
						name: 'Home'
					},
					icon: 'home-o'
				},
				{
					title: '我的',
					to: {
						name: 'Mine'
					},
					icon: 'user-o'
				}
			],
			active: 0
		}
	},
	methods: {
		handleChange(val) {
			console.log('tab value:', val)
		}
	}
}
</script>

<style lang="scss" scoped>
h3 {
	margin: 40px 0 0;
}
ul {
	list-style-type: none;
	padding: 0;
}
li {
	display: inline-block;
	margin: 0 10px;
}
a {
	color: #42b983;
}
</style>
