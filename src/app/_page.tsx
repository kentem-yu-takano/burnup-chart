'use client'

import Chart from '@/components/Chart'
import MockCode from '@/components/MockCode'
import Reader from '@/components/Reader'
import Table from '@/components/Table'
import { ChartData, InputData } from '@/types/ChartData'
import { format } from 'date-fns'
import ja from 'date-fns/locale/ja'
import { useEffect, useState } from 'react'

export default function Home() {
  const [arrayData, setArrayData] = useState<string[][]>([])
  const [datas, setDatas] = useState<InputData[]>([])
  const [displayList, setDisplayList] = useState<ChartData[]>([])
  const [averageVelocity, setAverageVelocity] = useState<number>(0)

  useEffect(() => {
    if (arrayData.length === 0) return

    let _datas: InputData[] = []
    for (let i = 1; i < arrayData.length; i++) {
      const columns = arrayData[i]
      _datas.push({
        iteration: Number(columns[0]),
        date: columns[1],
        done: !columns[2] ? undefined : Number(columns[2]),
        all: !columns[3] && _datas.length > 0 ? _datas[_datas.length - 1].all : Number(columns[3] ?? 0), // 総数が入力されていない場合は前回の総数にする
      })
    }

    setDatas(_datas)
  }, [arrayData])

  useEffect(() => {
    if (datas.length === 0) return

    const _displayList: ChartData[] = []
    let actualCount = 0
    for (let i = 0; i < datas.length; i++) {
      let _ideal = 0
      if (_displayList.length > 0) {
        // 理想完了数を算出
        const prevIdeal = _displayList[i - 1].ideal
        const idealPerDay = (datas[i].all - prevIdeal) / (datas.length - i)
        _ideal = prevIdeal + idealPerDay

        if (datas[i].done) {
          // 実績のあるイテレーションの数
          actualCount++
        }
      }

      const newData: ChartData = {
        iteration: datas[i].iteration,
        date: format(new Date(datas[i].date), 'MM/d', { locale: ja }),
        ideal: _ideal,
        done: datas[i].done,
        all: datas[i].all,
      }
      _displayList.push(newData)
    }

    const dones = _displayList.map((q) => q.done ?? 0)
    // 累計ベロシティ（最新の完了数）
    const sumVelocity = dones.reduce((a, b) => Math.max(a, b))
    // 最新のイテレーション
    const nowIndex = dones.indexOf(sumVelocity)
    // 平均ベロシティを算出
    const _averageVelocity = sumVelocity / actualCount

    if (_averageVelocity !== 0) {
      // 予測ベロシティを算出
      for (let i = 0; i < _displayList.length; i++) {
        if (i === nowIndex) _displayList[i].estimateVelocity = _displayList[i].done
        else if (_displayList[i].done === undefined) _displayList[i].estimateVelocity = i * _averageVelocity
      }
    }

    setAverageVelocity(_averageVelocity)
    setDisplayList(_displayList)
  }, [datas])

  return (
    <main className='flex min-h-screen flex-col items-center p-4'>
      <p className='font-bold text-4xl my-5'>リリース速度チャート</p>
      {displayList.length === 0 ? (
        <>
          <Reader setArrayData={setArrayData} />
          <MockCode />
        </>
      ) : (
        <div className='flex flex-grow w-full'>
          <div className='flex min-w-0'>
            <Table displayList={displayList} />
          </div>
          <div className='flex flex-col flex-grow min-w-0'>
            <div className='toast toast-top toast-end mt-8 mr-5'>
              <div className='alert bg-[#00947a] flex items-center'>
                <p className='text-white font-semibold'>平均ベロシティ：{averageVelocity.toFixed(1)}</p>
              </div>
            </div>
            <Chart displayList={displayList} />
          </div>
        </div>
      )}
    </main>
  )
}
