import { GETCOUNT, ORGANIZATION, getProjectsQuery } from '@/constants'
import { GitHubProjects } from '@/types'
import { GraphQLClient } from 'graphql-request'
import useSWR from 'swr'

export const useGetProjects = (client: GraphQLClient) => {
  const fetcher = ([query, organization, first]: [string, string, number]) =>
    client.request<GitHubProjects>(query, {
      organizationName: organization,
      projectsFirst: first,
    })

  return useSWR<GitHubProjects, Error>([getProjectsQuery, ORGANIZATION, GETCOUNT], fetcher, {
    suspense: true,
  })
}
