const MockCode = () => {
  return (
    <div className='flex flex-col mt-5 items-center'>
      <p>CSVは以下のフォーマットで作成してください。</p>
      <div className='mockup-code'>
        <pre data-prefix='1'>
          <code>イテレーション,終了日,完了数(ポイント),総数(ポイント)</code>
        </pre>
        <pre data-prefix='2'>
          <code>0,2023/10/23,0,49.5</code>
        </pre>
        <pre data-prefix='3'>
          <code>1,2023/11/02,9,49.5</code>
        </pre>
        <pre data-prefix='4'>
          <code>2,2023/11/17,23,49.5</code>
        </pre>
        <pre data-prefix='5'>
          <code>3,2023/12/01,,</code>
        </pre>
        <pre data-prefix='6'>
          <code>4,2023/12/14,,</code>
        </pre>
      </div>
    </div>
  )
}

export default MockCode
