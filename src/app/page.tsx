'use client'

import { Header } from '@/components'
import BurnupChart from '@/components/BurnupChart'
import CustomFieldList from '@/components/CustomFieldList'
import ProjectList from '@/components/ProjectList'
import { API } from '@/constants'
import { Field } from '@/types'
import { GraphQLClient } from 'graphql-request'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export default function Home() {
  const { data: session, status } = useSession()
  const [client, setClient] = useState<GraphQLClient>()
  const [projectNo, setProjectNo] = useState<number>()
  const [axisX, setAxisX] = useState<Field>()
  const [axisY, setAxisY] = useState<Field>()

  useEffect(() => {
    if (status === 'authenticated') {
      setClient(
        new GraphQLClient(API, {
          headers: {
            Authorization: `bearer ${session.accessToken}`,
          },
        }),
      )
    }
  }, [session, status])

  return (
    <>
      <Header />
      <div className='flex flex-grow w-full justify-center p-6'>
        {client && !projectNo && <ProjectList client={client} setProjectNo={setProjectNo} />}
        {client && projectNo && (
          <CustomFieldList client={client} projectNo={projectNo} setAxisX={setAxisX} setAxisY={setAxisY} />
        )}
        {client && projectNo && <BurnupChart client={client} projectNo={projectNo} axisX={axisX} axisY={axisY} />}
      </div>
    </>
  )
}
