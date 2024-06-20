import { useGetProjects } from '@/hooks'
import { GraphQLClient } from 'graphql-request'
import { Dispatch, SetStateAction } from 'react'

type Props = {
  client: GraphQLClient
  setProjectNo: Dispatch<SetStateAction<number | undefined>>
}

const ProjectList: React.FC<Props> = ({ client, setProjectNo }) => {
  // TODO:認証はされてるけどgraphqlから401が返ってくる→リフレッシュトークンが関係している？
  const { data } = useGetProjects(client)

  return (
    <div className='flex flex-col'>
      <p className='text-center p-6'>チャートを表示するプロジェクトを選んでください</p>
      <div className='overflow-x-auto'>
        <table className='table'>
          <thead>
            <tr>
              <th></th>
              <th>プロジェクト名</th>
              <th>URL</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.organization.projectsV2.nodes.map((project) => {
                return (
                  <tr key={project.number}>
                    <th>
                      <label>
                        <input type='checkbox' className='checkbox' onClick={() => setProjectNo(project.number)} />
                      </label>
                    </th>
                    <td>{project.title}</td>
                    <td>
                      <a className='link link-accent' href={project.url} target='_blank'>
                        {project.url}
                      </a>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProjectList
