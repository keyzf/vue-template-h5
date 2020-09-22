import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		component: () => import('@/views/TabBar'),
		redirect: '/home',
		meta: {
			title: '首页',
			keepAlive: false
		},
		children: [
			{
				path: 'home',
				name: 'Home',
				component: () => import('@/views/Home'),
				meta: { title: '首页', keepAlive: false }
			},
			{
				path: 'mine',
				name: 'Mine',
				component: () => import('@/views/Mine'),
				meta: { title: '我的', keepAlive: false }
			}
		]
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
