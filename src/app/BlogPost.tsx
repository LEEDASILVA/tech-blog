import Header from './components/design/Header.tsx'
import { useParams } from 'react-router-dom'
import Codemirror from './blogs/Codemirror.tsx'

const talks = {
  codemirror: Codemirror,
}

const BlogPost: FC = () => {
  const { name } = useParams()
  console.log(name)
  const Spell = talks[name.toLowerCase()]
  return (
    <div>
      <Header title={name} />
      <div
        style={{
          marginLeft: '10%',
          marginRight: '10%',
          marginTop: '5%',
          marginBottom: '5%',
        }}
      >
        <Spell />
      </div>
    </div>
  )
}

export default BlogPost
