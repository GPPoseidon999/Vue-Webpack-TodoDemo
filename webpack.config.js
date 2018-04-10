const webpack = require('webpack');
const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const ExtractPlugin=require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

//开发环境
const isDev = process.env.NODE_ENV === 'development'

const config = {
    devtool:'',
    target: 'web',
    //入口文件
    entry: {
        app:path.join(__dirname, 'src/index.js'),
        vendor:['vue']
    },
    //输出文件
    output: {
        filename: '[name].[hash:8].js', //文件名
        path: path.join(__dirname, 'dist') //文件路径
    },
    //配置加载资源
    module: {
        rules: [ //规则
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    }

                ]
            },
            {
                test: /\.styl/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    'stylus-loader'
                ]
            },
            {
                test: /\.(gif|jpg|png|svg|jpeg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024, //图片小于1024字节，转换成base64编码，写入文件里
                            name: '[name].[ext]'
                        }
                    }
                ]
            }

        ]
    },
    // externals: {
    //     'vue': 'Vue'  //不将vue源码一起编译打包
    // },

    //插件配置
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
        new HTMLPlugin({
            title: "sss",
            inject: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name:'vendor'
        }),
        new UglifyJsPlugin()
        
    ],

}
//开发环境配置
if (isDev) {
    config.devtool = '#cheap-module-eval-source-map'
    config.devServer = {
        port: '8000',
        host: '127.0.0.1',
        overlay: {
            errors: true,
        },
        open: true, //服务启动时候打开浏览器
        hot: true //更新代码不会刷新页面
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}

module.exports = config;