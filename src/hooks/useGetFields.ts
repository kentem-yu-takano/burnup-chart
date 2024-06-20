import { ORGANIZATION, getCustomFieldQuery } from '@/constants'
import { GitHubCustomFields } from '@/types'
import { GraphQLClient } from 'graphql-request'
import useSWR from 'swr'

export const useGetFields = (client: GraphQLClient, projectNo: number) => {
  const fetcher = ([query, organization, projectNo]: [string, string, number]) =>
    client.request<GitHubCustomFields>(query, {
      organizationName: organization,
      projectNo: projectNo,
    })

  return useSWR<GitHubCustomFields, Error>([getCustomFieldQuery, ORGANIZATION, projectNo], fetcher, {
    suspense: true,
  })
}
