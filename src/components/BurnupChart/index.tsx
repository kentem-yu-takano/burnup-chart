import { useGetIssues } from '@/hooks'
import { Field } from '@/types'
import { GraphQLClient } from 'graphql-request'

type Props = {
  client: GraphQLClient
  projectNo: number
  axisX?: Field
  axisY?: Field
}

const BurnupChart: React.FC<Props> = ({ client, projectNo, axisX, axisY }) => {
  const { data } = useGetIssues(client, projectNo)
  console.log(data)
  return (
    <div className='flex flex-col'>
      <div>
        X軸：{axisX?.name}
        Y軸：{axisY?.name}
      </div>
      <div>↓↓↓↓↓↓ここにグラフを表示したかった。。。。。。。。。↓↓↓↓↓↓↓</div>
      <div>{JSON.stringify(data)}</div>
    </div>
  )
}

export default BurnupChart
