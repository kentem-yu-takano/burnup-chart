import { gql } from 'graphql-request'

/**
 * Projectの一覧を取得するクエリ
 */
export const getProjectsQuery = gql`
  query Projects($organizationName: String!, $projectsFirst: Int) {
    organization(login: $organizationName) {
      projectsV2(first: $projectsFirst) {
        nodes {
          number
          title
          url
        }
      }
    }
  }
`

/**
 * カスタムフィールドを取得するクエリ
 */
export const getCustomFieldQuery = gql`
  query Projects($organizationName: String!, $projectNo: Int!) {
    organization(login: $organizationName) {
      projectV2(number: $projectNo) {
        fields(first: 20) {
          nodes {
            ... on ProjectV2FieldCommon {
              id
              name
              dataType
            }
          }
        }
      }
    }
  }
`

/**
 * issue(タスク)を取得するクエリ
 */
export const getIssuesQuery = gql`
  query Projects($organizationName: String!, $projectNo: Int!, $cursor: String) {
    organization(login: $organizationName) {
      projectV2(number: $projectNo) {
        items(first: 50, after: $cursor) {
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            id
            isArchived
            fieldValues(first: 20) {
              nodes {
                ... on ProjectV2ItemFieldDateValue {
                  date
                  field {
                    ... on ProjectV2FieldCommon {
                      id
                      name
                    }
                  }
                }
                ... on ProjectV2ItemFieldSingleSelectValue {
                  name
                  nameHTML
                  optionId
                  field {
                    ... on ProjectV2FieldCommon {
                      id
                      name
                    }
                  }
                }
                ... on ProjectV2ItemFieldIterationValue {
                  iterationId
                  startDate
                  title
                  field {
                    ... on ProjectV2FieldCommon {
                      id
                      name
                    }
                  }
                }
                ... on ProjectV2ItemFieldNumberValue {
                  number
                  field {
                    ... on ProjectV2FieldCommon {
                      id
                      name
                    }
                  }
                }
              }
            }
            content {
              ... on Issue {
                title
                id
                number
                closed
                closedAt
                createdAt
                milestone {
                  id
                  title
                }
                labels(first: 5) {
                  nodes {
                    id
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
