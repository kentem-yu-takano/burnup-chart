'use client'

import { signIn, signOut, useSession } from 'next-auth/react'

const Header = () => {
  const { data: session, status } = useSession()

  return (
    <div className='navbar bg-base-300 rounded-box px-8'>
      <div className='flex-1'>
        <p className='text-xl font-bold'>リリース速度チャート</p>
      </div>
      <div className='flex-none gap-2'>
        {session && (
          <>
            <p className='mx-2 font-semibold'>{session.user?.name}</p>
            <button onClick={() => signOut()} className='btn btn-secondary'>
              サインアウト
            </button>
          </>
        )}
        {!session && status === 'unauthenticated' && (
          <>
            <p className='mx-2 font-semibold'>サインインしてください</p>
            <button onClick={() => signIn()} className='btn btn-secondary'>
              サインイン
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Header
