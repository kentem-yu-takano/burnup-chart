import { ChartData } from '@/types/ChartData'

type Props = {
  displayList: ChartData[]
}
const Table: React.FC<Props> = ({ displayList }) => {
  return (
    <table className='table table-sm h-fit w-fit bg-[#f9fcff]'>
      <thead className='text-center bg-[#0073a8] text-white h-12'>
        <tr>
          <th className='rounded-tl-2xl'>イテレーション</th>
          <th>理想完了数</th>
          <th>完了数</th>
          <th>総数</th>
          <th>計画進捗</th>
          <th className='rounded-tr-2xl'>実施進捗</th>
        </tr>
      </thead>
      <tbody>
        {displayList.map((data, index) => {
          return (
            <tr key={index} className='text-center'>
              <td>
                <div>{data.iteration}</div>
                <div className='text-sm opacity-60'>{data.date}</div>
              </td>
              <td>{data.ideal.toFixed(2)}</td>
              <td>{data.done ?? '--'}</td>
              <td>{data.all}</td>
              <td className='text-[#006eb0]'>{((data.ideal / data.all) * 100).toFixed(1)}%</td>
              <td className='text-[#b33e5c]'>
                {data.done === undefined ? '--' : ((data.done / data.all) * 100).toFixed(1)}%
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Table
