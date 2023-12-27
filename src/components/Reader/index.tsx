import { Dispatch, SetStateAction } from 'react'
import { useCSVReader } from 'react-papaparse'

type Props = {
  setArrayData: Dispatch<SetStateAction<string[][]>>
}
const Reader: React.FC<Props> = ({ setArrayData }) => {
  const { CSVReader } = useCSVReader()
  return (
    <CSVReader
      onUploadAccepted={(results: any) => {
        if (results.errors && results.errors.length > 0) {
          console.error('CSVデータを読み込めません。')
          return
        }
        setArrayData(results.data)
      }}
    >
      {({ getRootProps, acceptedFile, ProgressBar }: any) => (
        <>
          <div className='flex my-5'>
            <button type='button' className='btn btn-accent' {...getRootProps()}>
              CSVファイルを選択してください
            </button>
            <div className='leading-[48px] pl-2'>{acceptedFile && acceptedFile.name}</div>
          </div>
          <ProgressBar />
        </>
      )}
    </CSVReader>
  )
}

export default Reader
