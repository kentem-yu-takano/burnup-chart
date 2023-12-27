import { ChartData } from '@/types/ChartData'
import { Brush, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

type Props = {
  displayList: ChartData[]
}
const Chart: React.FC<Props> = ({ displayList }) => {
  return (
    <ResponsiveContainer>
      <LineChart
        data={displayList}
        margin={{
          top: 20,
          right: 60,
          left: 5,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis xAxisId={0} dataKey='iteration' interval={0} />
        <XAxis xAxisId={1} dataKey='date' interval={0} axisLine={false} tickLine={false} fillOpacity={0.6} />
        <YAxis dataKey='all' tickCount={8} />
        <Line type='monotone' name='総数' dataKey='all' stroke='#006a6c' strokeWidth={2} activeDot={{ r: 8 }} />
        <Line
          type='monotone'
          strokeDasharray='4 4'
          name='理想完了数'
          dataKey='ideal'
          stroke='#00608d'
          activeDot={{ r: 8 }}
        />
        <Line type='monotone' name='完了数' dataKey='done' stroke='#e95464' strokeWidth={3} activeDot={{ r: 8 }} />
        <Line
          type='monotone'
          strokeDasharray='4 4'
          name='予測ベロシティ'
          dataKey='estimateVelocity'
          stroke='#e9bc00'
          strokeWidth={3}
          activeDot={{ r: 8 }}
        />
        <Brush />
        <Legend />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default Chart
