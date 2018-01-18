1.安装项目

git clone https://github.com/zhouharday/touhang.git

2.运行项目

npm install //安装依赖

npm run build //构建项目

npm run dev //运行项目

3.项目介绍

## Directory structure ##
4.项目目录

        |-- build                                 // 项目构建及打包配置文件
        |-- config                                // axios本地代理服务配置文件
        |-- node_modules                          // 项目依赖所需文件
        |-- src                                   // 源代码目录  
        |   |-- api                               // 后台接口公共方法文件  
        |   |-- common                            // 项目公共方法定义文件  
        |   |-- commponents                       // 公共组件文件  
        |   |-- router                            // 路由配置文件  
        |   |-- store                             // 全局状态管理文件  
        |   |-- views                             // 项目所有模块组件文件  
        |   |-- App.vue                           // 项目根组件  
        |   |-- main.js                           // 项目入口文件  
        |-- static                                // web静态资源加载文件
        |   |-- css
        |   |-- image   
        |   |-- img
        |   |-- js 
        |   |-- source 
        |   |-- .gitkeep 
        |   |-- data.json  
        |-- index.html                            // 视口文件  
        |-- package.json                          // 项目配置文件  
        |-- README.md                             // 项目的说明文档  
        |-- server.js                             // 启动本地代理服务文件
## Project module ##


├── index.html                              入口页面     
   ├── build                                构建脚本目录     
        │   ├── build-server.js             运行本地构建服务器以访问构建后的页面      
        │   ├── build.js                    生产环境构建脚本      
        │   ├── dev-client.js               开发服务器热重载脚本，主要用来实现开发阶段的页面自动刷新  
        │   ├── dev-server.js               运行本地开发服务器  
        │   ├── utils.js                    构建相关工具方法  
        │   ├── webpack.base.conf.js        wabpack基础配置
        │   ├── webpack.dev.conf.js         wabpack开发环境配置
        │   └── webpack.prod.conf.js        wabpack生产环境配置
   ├── config                               项目配置
        │   ├── dev.env.js                  开发环境变量
        │   ├── index.js                    项目配置文件
        │   ├── prod.env.js                 生产环境变量
   ├── src                                  项目源码目录    
   │   ├── main.js                          入口js文件
       │   ├── app.vue                      根组件
       │   ├── components                   公共组件目录
       │   │   └── header.vue
       │   ├── assets                       资源目录，这里的资源会被wabpack构建
       │   │   └── images
       │   │       └── logo.png
       │   ├── routes                       前端路由
       │   │   └── index.js
       │   ├── store                        应用级数据（state）
       │   │   └── index.js
       │   └── views                        页面目录
       ├── package.json                     npm包配置文件，里面定义了项目的npm脚本，依赖包等信息
       ├── static                           纯静态资源，不会被wabpack构建。
    
5.项目功能模块

● 日常办公模块

● 领投助手模块

● 项目管理模块

● 基金管理模块

● 投资者管理模块

● 综合查询模块

● 统计分析模块

● 系统管理模块


5-1:日常办公
（截图）





























