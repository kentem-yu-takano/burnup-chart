export type GitHubProjects = {
  organization: {
    projectsV2: {
      nodes: Project[]
    }
  }
}
type Project = {
  number: number
  title: string
  url: string
}

export type GitHubCustomFields = {
  organization: {
    projectV2: {
      fields: {
        nodes: Field[]
      }
    }
  }
}
export type Field = {
  id: string
  name: string
  dataType: FIELD_TYPES
}
enum FIELD_TYPES {
  ASSIGNEES,
  LINKED_PULL_REQUESTS,
  REVIEWERS,
  LABELS,
  MILESTONE,
  REPOSITORY,
  TITLE,
  TEXT,
  SINGLE_SELECT,
  NUMBER,
  DATE,
  ITERATION,
}

export type GitHubIssues = {
  organization: {
    projectV2: {
      items: {
        pageInfo: {
          hasNextPage: boolean
          endCursor: string
        }
        nodes: Issue[]
      }
    }
  }
}
export type Issue = {
  id: string
  isArchived: boolean
  fieldValues: {
    nodes: ({} | IterationFieldValue | SelectFieldValue | NumberFieldValue)[]
  }
  content: {
    title: string
    id: string
    number: string
    closed: boolean
    milestone: {
      id: string
      title: string
    }
    labels: {
      nodes: {
        id: string
        name: string
      }[]
    }
  }
}
export type FieldValue = {
  id: string
  name: string
}
export type IterationFieldValue = {
  iterationId: string
  startDate: string
  title: string
  field: FieldValue
}
export type SelectFieldValue = {
  name: string
  optionId: string
  field: FieldValue
}
export type NumberFieldValue = {
  number: number
  field: FieldValue
}
