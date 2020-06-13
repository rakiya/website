import { Component, Vue } from "vue-property-decorator"
import Color from "@/utils/Color"

@Component
export default class DefaultColors extends Vue {
  // テーマカラー
  readonly MAIN_COLOR = new Color(0xff7777)
  // サブカラー
  readonly SUB_COLOR = new Color(0x3cb46e)
  // リンク
  readonly DARK_SHADES = new Color(0x767676)
  // 背景
  readonly BACKGROUND_COLOR = new Color(0xffffff)
}
