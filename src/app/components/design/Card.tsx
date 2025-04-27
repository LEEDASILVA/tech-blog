import Badge from './Badge.tsx'
import { useNavigate } from 'react-router-dom'
import { useResponsive } from '../../context/ResponsiveContext.tsx'

interface CardType {
  title: string
  categories: string[]
  description?: string
  redirect?: string
}

const Card: FC<CardType> = ({ title, categories, description, redirect }) => {
  const categoriesKey = Object.keys(categories)
  const navigate = useNavigate()
  //const { isMobile } = useResponsive()

  return (
    <div className="card">
      <h3 className="card-title">{title}</h3>
      <div className="card-categories">
        {categoriesKey.map(k => (
          <Badge key={k} label={categories[k]} />
        ))}
      </div>
      {description && <p className="card-description">{description}</p>}
      <button
        className="card-button"
        type="button"
        onClick={() => redirect && navigate(redirect)}
      >
        Read More
      </button>
    </div>
  )
}

export default Card
