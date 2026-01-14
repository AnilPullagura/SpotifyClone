import {Link} from 'react-router-dom'
import './index.css'
import '../hover.css'

const EditorsItem = props => {
  const {details} = props

  const {id, albumThumbnail, name} = details
  return (
    <li className="album-item hover">
      <Link style={{textDecoration: 'none'}} to={`/playlist/${id}`}>
        <img
          className="album-img"
          src={albumThumbnail}
          alt="featured playlist"
        />
        <p className="album-name">{name}</p>
      </Link>
    </li>
  )
}

export default EditorsItem
