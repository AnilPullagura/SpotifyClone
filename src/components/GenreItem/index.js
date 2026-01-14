import {Link} from 'react-router-dom'
import './index.css'
import '../hover.css'

const GenreItem = props => {
  const {details} = props

  const {id, categoryImage} = details
  return (
    <li className="album-item hover">
      <Link style={{textDecoration: 'none'}} to={`/category/${id}/playlists`}>
        <img className="album-img" src={categoryImage} alt="category" />
      </Link>
    </li>
  )
}

export default GenreItem
