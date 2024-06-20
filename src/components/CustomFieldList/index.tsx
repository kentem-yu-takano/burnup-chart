import { useGetFields } from '@/hooks'
import { Field } from '@/types'
import { GraphQLClient } from 'graphql-request'
import { Dispatch, SetStateAction } from 'react'

type Props = {
  client: GraphQLClient
  projectNo: number
  setAxisX: Dispatch<SetStateAction<Field | undefined>>
  setAxisY: Dispatch<SetStateAction<Field | undefined>>
}

const CustomFieldList: React.FC<Props> = ({ client, projectNo, setAxisX, setAxisY }) => {
  const { data } = useGetFields(client, projectNo)

  return (
    <div className='flex gap-4'>
      {data && (
        <>
          <div className='flex'>
            <p className='p-2'>X軸：</p>
            <div className='overflow-x-auto'>
              <select
                className='select select-bordered w-full max-w-xs'
                onChange={(e) =>
                  setAxisX(data.organization.projectV2.fields.nodes.find((q) => q.id === e.currentTarget.value))
                }
              >
                <option disabled selected>
                  フィールドを選択してください
                </option>
                {data.organization.projectV2.fields.nodes.map((field) => {
                  return (
                    <option key={field.id} value={field.id}>
                      {field.name}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>
          <div className='flex'>
            <p className='p-2'>Y軸：</p>
            <div className='overflow-x-auto'>
              <select
                className='select select-bordered w-full max-w-xs'
                onChange={(e) =>
                  setAxisY(data.organization.projectV2.fields.nodes.find((q) => q.id === e.currentTarget.value))
                }
              >
                <option disabled selected>
                  フィールドを選択してください
                </option>
                {data.organization.projectV2.fields.nodes.map((field) => {
                  return (
                    <option key={field.id} value={field.id}>
                      {field.name}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default CustomFieldList
