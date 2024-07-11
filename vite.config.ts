
import vue from '@vitejs/plugin-vue'
import { resolve } from "path";
import AutoImport from "unplugin-auto-import/vite"
import Components from 'unplugin-vue-components/vite';
 

import { ConfigEnv, defineConfig } from "vite";
import { getConfig } from "./config/cfg";

console.log(getConfig())
const getViteConfig = (configEnv: ConfigEnv) => {
    const { mode } = configEnv;
    const option = {
        plugins: [
			vue(),
			AutoImport({
				imports: ['vue', 'vue-router'],
				dts: "src/auto-import.d.ts",
			}),
			Components({
				// 引入组件的,包括自定义组件
				// 存放的位置
				dts: "src/components.d.ts",
			}),
		],
	  resolve: {
		alias: {
		  '@': resolve(__dirname, 'src') 
		}
	}, server: {
		proxy: {
			'/api': { // 匹配请求路径，
				target: '你要代理的地址', // 代理的目标地址
				 // 开发模式，默认的127.0.0.1,开启后代理服务会把origin修改为目标地址
				changeOrigin: true,
				// secure: true, // 是否https接口
				// ws: true, // 是否代理websockets
	
				// 路径重写，**** 如果你的后端有统一前缀(如:/api)，就不开启；没有就开启
				//简单来说，就是是否改路径 加某些东西
				rewrite: (path) => path.replace(/^\/api/, '') 
			}
		}
	},
        define: {
            "import.meta.env.config": JSON.stringify(getConfig())
        },
        build: {
            target: "es6"
        },
        esbuild: {}
    };
    if (mode !== "dev") {
        option.esbuild = {
            // drop: ["console", "debugger"]
        };
    }
    return option;
};
// https://vitejs.dev/config/
export default defineConfig((configEnv: ConfigEnv) => getViteConfig(configEnv));
