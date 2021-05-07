const { environment } = require('@rails/webpacker')
const { VueLoaderPlugin } = require('vue-loader')
const vue = require('./loaders/vue')
const aliasConfig = require('./alias') //作成した alias.js を aliasConfig という名前で

environment.plugins.prepend('VueLoaderPlugin', new VueLoaderPlugin())
environment.loaders.prepend('vue', vue)
environment.config.merge(aliasConfig) //config に追加する
module.exports = environment
