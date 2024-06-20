import { ORGANIZATION, getIssuesQuery } from '@/constants'
import { GitHubIssues } from '@/types'
import { GraphQLClient } from 'graphql-request'
import useSWR from 'swr'

export const useGetIssues = (client: GraphQLClient, projectNo: number) => {
  const fetcher = ([query, organization, projectNo]: [string, string, number]) =>
    client.request<GitHubIssues>(query, {
      organizationName: organization,
      projectNo: projectNo,
    })

  return useSWR<GitHubIssues, Error>([getIssuesQuery, ORGANIZATION, projectNo], fetcher, {
    suspense: true,
  })
}
