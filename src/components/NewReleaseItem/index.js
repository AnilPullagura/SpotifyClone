import {Link} from 'react-router-dom'
import './index.css'
import '../hover.css'

const NewReleaseItem = props => {
  const {details} = props

  const {id, imageUrl, name} = details
  return (
    <li className="album-item hover">
      <Link style={{textDecoration: 'none'}} to={`/album/${id}`}>
        <img className="album-img" src={imageUrl} alt="new release album" />
        <p className="album-name">{name}</p>
      </Link>
    </li>
  )
}

export default NewReleaseItem
