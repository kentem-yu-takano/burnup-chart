'use client'

import { Header } from '@/components'
import { useEffect } from 'react'

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <>
      <Header />
      <div role='alert' className='alert alert-error'>
        <span>エラーが発生しました</span>
        <button className='btn btn-ghost' onClick={() => reset()}>
          リセット
        </button>
      </div>
    </>
  )
}
