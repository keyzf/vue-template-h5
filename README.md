# vue-template-h5

一套快速构建项目的移动端模板，涵盖以下功能与配置

- rem 布局及适配

- Sass 全局样式

- VantUI 组件按需加载

- Vuex 状态管理

- Axios 封装及接口管理

- Vue-router 路由配置

- proxy 跨域配置

- cdn 及 externals 配置

- Webpack 4 vue.config.js 基础配置

- 多环境变量配置

- Eslint+Pettier 统一开发规范

### 启动项目

```bash

git clone https://github.com/zhangfeiv/vue-template-h5

cd vue-template-h5

npm install

npm run serve
```

### rem 适配方案

Vant 中的样式默认使用`px`作为单位，如果需要使用`rem`单位，推荐使用以下两个工具:

- [postcss-pxtorem](https://github.com/cuth/postcss-pxtorem) 是一款 `postcss` 插件，用于将单位转化为 `rem`
- [amfe-flexible](https://github.com/amfe/lib-flexible) 用于设置 `rem` 基准值，直接在 `main.js` 中引入

##### PostCSS 配置

下面提供了一份基本的 `postcss` 配置，可以在此配置的基础上根据项目需求进行修改

```javascript
module.exports = {
	plugins: {
		autoprefixer: {
			Browserslist: ['Android >= 4.0', 'iOS >= 8']
		},
		'postcss-pxtorem': {
			rootValue: 37.5,
			propList: ['*']
		}
	}
}
```

[▲ 回顶部](#top)

### VantUI 组件按需加载 

项目采用[Vant 自动按需引入组件 (推荐)](https://youzan.github.io/vant/#/zh-CN/quickstart#fang-shi-yi.-zi-dong-an-xu-yin-ru-zu-jian-tui-jian)下面安装插件介绍：[babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 是一款 `babel` 插件，它会在编译过程中将`import` 的写法自动转换为按需引入的方式

#### 安装插件

```bash
npm i babel-plugin-import -D
```

在`babel.config.js` 设置

```javascript
// 对于使用 babel7 的用户，可以在 babel.config.js 中配置
const plugins = [
  [
    'import',
    {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    },
    'vant'
  ]
]
module.exports = {
	presets: ['@vue/cli-plugin-babel/preset'],
	plugins
}
```

#### 使用组件

项目在 `src/plugins/vant.js` 下统一管理组件

```javascript
// 按需全局引入 vant组件
import Vue from 'vue'
import { Button, List, Cell, Tabbar, TabbarItem } from 'vant'
Vue.use(Button)
Vue.use(Cell)
Vue.use(List)
Vue.use(Tabbar).use(TabbarItem)
```

[▲ 回顶部](#top)

### Sass 全局样式

#### 目录结构

vue-template-h5 所有全局样式都在 `@/assets/css` 目录下设置

```bash
├── assets
│   ├── css
│   │   ├── index.scss               # 全局通用样式
│   │   ├── mixin.scss               # 全局mixin
│   │   └── variables.scss           # 全局变量
```

#### 自定义 vant-ui 样式

现在我们来说说怎么重写 `vant-ui` 样式。由于 `vant-ui` 的样式我们是在全局引入的，所以你想在某个页面里面覆盖它的样式就不能加 `scoped`，但你又想只覆盖这个页面的 `vant` 样式，你就可在它的父级加一个 `class`，用命名空间来解决问题。

```css
.about-container {
  /* 你的命名空间 */
  .van-button {
    /* vant-ui 元素*/
    margin-right: 0px;
  }
}
```

#### 父组件改变子组件样式 深度选择器

当你子组件使用了 `scoped` 但在父组件又想修改子组件的样式可以 通过 `>>>` 来实现：

```css
<style scoped>
.a >>> .b { /* ... */ }
</style>
```

#### 全局变量

`vue.config.js` 配置使用 `css.loaderOptions` 选项,注入 `sass` 的 `mixin` `variables` 到全局，不需要手动引入 ,配置`$cdn`通过变量形式引入 cdn 地址,这样向所有 Sass/Less 样式传入共享的全局变量：

```javascript
module.exports = {
  css: {
    extract: IS_PROD,
    sourceMap: false,
    loaderOptions: {
      // 给 scss-loader 传递选项
      scss: {
        // 注入 `sass` 的 `mixin` `variables` 到全局
        prependData: `
                @import "assets/css/mixin.scss";
                @import "assets/css/variables.scss";
                 `
      }
    }
  }
}
```

```javascript
// 引入全局样式
import '@/assets/css/index.scss'

```

[▲ 回顶部](#top)

### Vuex 状态管理

目录结构

```bash
├── store
│   ├── modules
│   │   └── app.js
│   ├── index.js
```

`main.js` 引入

```javascript
import Vue from 'vue'
import App from './App.vue'
import store from './store'
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
```

使用

```html
<script>
  import { mapGetters,mapActions } from 'vuex'
  export default {
    computed: {
      ...mapGetters(['userName'])
    },

    methods: {
      ...mapActions(['setUserName'])
    }
  }
</script>
```

[▲ 回顶部](#top)

### Vue-router

```javascript
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
```

[▲ 回顶部](#top)

###  Axios 封装及接口管理

`utils/request.js` 封装 axios ,开发者需要根据后台接口做修改。

- `service.interceptors.request.use` 里可以设置请求头，比如设置 `token`
- `config.hideloading` 是在 api 文件夹下的接口参数里设置，下文会讲
- `service.interceptors.response.use` 里可以对接口返回数据处理，比如 401 删除本地信息，重新登录

```javascript
import store from '@/store'
import axios from 'axios'
import { Toast } from 'vant'
// create an axios instance
const service = axios.create({
	baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
	withCredentials: true, // send cookies when cross-domain requests
	timeout: 5000 // request timeout
})

// request拦截器 request interceptor
service.interceptors.request.use(
	config => {
		// 不传递默认开启loading
		if (!config.hideloading) {
			// loading
			Toast.loading({
				forbidClick: true
			})
		}
		if (store.getters.token) {
			config.headers['Authorization'] = ''
		}
		return config
	},
	error => {
		// do something with request error
		console.log(error) // for debug
		return Promise.reject(error)
	}
)
// respone拦截器
service.interceptors.response.use(
	response => {
		Toast.clear()
		const res = response.data
		if (res.status && res.status !== 200) {
			// 登录超时,重新登录
			if (res.status === 401) {
				store.dispatch('FedLogOut').then(() => {
					location.reload()
				})
			}
			return Promise.reject(res || 'error')
		} else {
			return Promise.resolve(res)
		}
	},
	error => {
		Toast.clear()
		console.log('err' + error) // for debug
		return Promise.reject(error)
	}
)

export default service
```

#### 接口管理

在`src/api` 文件夹下统一管理接口

- 你可以建立多个模块对接接口, 比如 `user.js`
- `url` 接口地址，请求的时候会拼接上 `config` 下的 `baseApi`
- `method` 请求方法
- `data` 请求参数 
- `hideloading` 默认 `false`,设置为 `true` 后，不显示 `loading`

```javascript
// axios
import request from '@/utils/request'

// 登录
export function login(data) {
	return request({
		url: '/user/login',
		method: 'post',
		data
	})
}
// 用户名称 get 方法
export function getUserName(params) {
	return request({
		url: '/user/name',
		method: 'get',
		params,
		hideloading: true
	})
}
```

#### 如何调用

```javascript
// 请求接口
import { getUserInfo } from '@/api'

const params = { user: 'zhangfei' }
getUserInfo(params)
  .then(() => {})
  .catch(() => {})
```

[▲ 回顶部](#top)

### 配置 proxy 跨域

如果你的项目需要跨域设置，你需要打来 `vue.config.js` `proxy` 注释 并且配置相应参数

<u>**!!!注意：你还需要将 `.env.development` 里的 `VUE_APP_BASE_API` 设置成 '/'**</u>

```javascript
module.exports = {
  devServer: {
    // ....
    proxy: {
      //配置跨域
      '/api': {
        target: 'https://test.xxx.com', // 接口的域名
        // ws: true, // 是否启用websockets
        changOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
}
```

[▲ 回顶部](#top)

### 配置 externals 引入 cdn 资源 

```javascript
module.exports = {
	configureWebpack: config => {
		// 引入cdn时，不打包以下模块
		config.externals = {
			vue: 'Vue',
			'vue-router': 'VueRouter',
			vuex: 'Vuex',
			vant: 'vant',
			axios: 'axios'
		}
	}
}
```

在 public/index.html 中添加

```javascript
使用CDN加速的JS文件
<script src="https://cdn.jsdelivr.net/npm/vant@2.4.7/lib/index.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/axios@0.19.2/dist/axios.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vuex@3.1.2/dist/vuex.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue-router@3.1.5/dist/vue-router.min.js"></script>
```

[▲ 回顶部](#top)

### Eslint + Pettier 统一开发规范

在 `.eslintrc.js` 配置 `pettier` 规则，

```bash
module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
	parserOptions: {
		parser: 'babel-eslint'
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'prettier/prettier': [
			'warn',
			{
				semi: false, // 行位是否使用分号，默认为true
				trailingComma: 'none', // 是否使用尾逗号，有三个可选值"<none|es5|all>"
				singleQuote: true, // 字符串是否使用单引号，默认为false，使用双引号
				printWidth: 120, // 一行的字符数，如果超过会进行换行，默认为80
				tabWidth: 2, // 一个tab代表几个空格数
				useTabs: true, // 启用tab缩进
				bracketSpacing: true // 对象大括号直接是否有空格，默认为true，效果：{ foo: bar }
			}
		]
	}
}
```

安装 vscode `prettier` 插件，并将配置与上述保持一致

[▲ 回顶部](#top)

##### 如对你有所帮助，记得点个小星星 ★          一起加油，成为最靓的仔~~~