/**
 * バーンアップチャートに表示するデータの型
 * @property iteration - イテレーション番号
 * @property date - イテレーションの終了日
 * @property ideal - 理想完了数(「(a)昨日の理想的な完了工数」+ 「1日あたりの理想的な完了工数（= ( 総工数-(a) ) / プロジェクトの残日数）」)
 * @property done - 完了数（ポイント）
 * @property all - 総数（ポイント）
 * @property estimateVelocity - 予測ベロシティ
 */
export type ChartData = {
  iteration: number
  date: string
  ideal: number
  done?: number
  all: number
  estimateVelocity?: number
}

/**
 * 入力が必要なデータの型
 * @property iteration - イテレーション番号
 * @property date - イテレーションの終了日(yyyy/MM/dd)
 * @property done - 完了数（ポイント）
 * @property all - 総数（ポイント）
 */
export type InputData = {
  iteration: number
  date: string
  done?: number
  all: number
}

// メモ
// 総数がいつ変わったかわかるか・・？実行時に総数を取得して、csvに書き出していく？
