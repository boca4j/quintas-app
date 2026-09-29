import { useParams } from 'react-router-dom'

function DetalhePage() {
  const { id } = useParams()
  return <div className="p-6">DetalhePage — espaço {id}</div>
}

export default DetalhePage
