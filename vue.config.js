module.exports = {
	publicPath: '/', //部署应用包时的基本URL
	outputDir: 'dist', //  生产环境构建文件的目录
	assetsDir: 'static', //  outputDir的静态资源目录
	productionSourceMap: false, // 关闭sourceMap 加速生产环境构建

	devServer: {
		port: 8080, // 端口
		open: true, // 启动后打开浏览器
		// 当出现错误或警告时，是否在浏览器全屏显示
		overlay: {
			warnings: false,
			errors: true
		}
		//配置跨域
		// proxy: {
		//   '/api': {
		//       target: "https://test.xxx.com",
		//       // ws:true,
		//       changOrigin:true,
		//       pathRewrite:{
		//           '^/api':'/'
		//       }
		//   }
		// }
	},

	css: {
		sourceMap: false,
		loaderOptions: {
			scss: {
				//配置全局sass样式变量
				prependData: `
					@import "@/assets/css/mixin.scss";
					@import "@/assets/css/variables.scss";
          `
			}
		}
	},

	// configureWebpack: config => {
	// 	// 引入cdn时，不打包以下模块
	// 	config.externals = {
	// 		vue: 'Vue',
	// 		'vue-router': 'VueRouter',
	// 		vuex: 'Vuex',
	// 		vant: 'vant',
	// 		axios: 'axios'
	// 	}
	// },

	chainWebpack: config => {
		// 移除预读取 prefetch 插件
		config.plugins.delete('prefetch')

		// 保留元素之间的空格
		config.module
			.rule('vue')
			.use('vue-loader')
			.loader('vue-loader')
			.tap(options => {
				options.compilerOptions.preserveWhitespace = true
				return options
			})
			.end()
	}
}
