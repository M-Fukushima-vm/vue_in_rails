import "dayjs/locale/ja"; // 日本locale を別途 import
import dayjs from "dayjs";
import Vue from "vue"; // Vueのプロトタイプに設定する為 import

dayjs.locale("ja"); // 日本localeを設定

Vue.prototype.$dayjs = dayjs; // プロトタイプに追加
// $dayjs で全ての Vueインスタンスで使用可能にする
