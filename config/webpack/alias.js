// エイリアスの拡張設定ファイル
// インポート先ファイルの相対パスを簡易的に書けるようにする

const path = require('path')
module.exports = {
  resolve: {
    // aliasという名前で
    alias: {
      // @ を     '..'は「このファイルのある場所(webpack)」の上の階層を示す
      '@': path.resolve(__dirname, '..', '..', 'app/javascript')
      // 上(config > webpack)の上     =>つまりプロジェクト全体が入ったディレクトリ
      // から見た時の 'app/javascript'
      // を指す様に設定する
    }
  }
}