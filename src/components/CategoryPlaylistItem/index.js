import {Link} from 'react-router-dom'
import './index.css'
import '../hover.css'

const CategoryPlaylistItem = props => {
  const {details} = props
  const {podcastImg, id, podcastName, totalTracks} = details
  return (
    <li>
      <Link className="category-link " to={`/playlist/${id}`}>
        <div className="category-playlist-item hover">
          <img
            className="category-details-img"
            src={podcastImg}
            alt="cateogry"
          />
          <div>
            <h1 className="podcast-name">{podcastName}</h1>
            <p className="podcast-track">{totalTracks} Tracks</p>
          </div>
        </div>
      </Link>
    </li>
  )
}
export default CategoryPlaylistItem
