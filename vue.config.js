module.exports = {
    // 关闭eslint校验
    lintOnSave: false,
    devServer:{
        proxy:{
            '/api': {
                target:'http://39.98.123.211',
            }
        }
    },
    // 打包后不显示报错信息在哪一行哪一列
    productionSourceMap: false,
    configureWebpack: config=>{
        if(process.env.NODE_ENV === 'production') {
            //为生产环境修改配置
            config.mode = 'production';
            // 打包文件大小配置
            config.performance = {
                maxEntrypointSize: 10000000,
                maxAssetSize: 30000000
            }
            config.entry = {
                app: './src/main-prod.js'
            }
        } else {
            //为开发环境修改配置
            config.mode = 'development'
            config.entry = {
                app: './src/main-dev.js'
            }
        }
    }
}
