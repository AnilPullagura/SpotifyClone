import {IoMdPlayCircle} from 'react-icons/io'
import {MdPauseCircleFilled} from 'react-icons/md'

import './albumItem.css'
const AlbumItem = props => {
  const {details, onchangeItem, isActive} = props
  const {trackid, trackDuration, trackName, trackArtist} = details

  const getDuration = trackDurationSec => {
    const totalSeconds = Math.floor(trackDurationSec / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = trackDurationSec % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }
  const activeAlbum = isActive && 'active-track'

  const songDuration = getDuration(trackDuration)

  const changeId = () => {
    onchangeItem(trackid)
  }

  return (
    <li onClick={changeId} className={`each-album-list-item ${activeAlbum}`}>
      <div className="each-list-item">
        <span className="album-track-play">
          {trackName}
          {isActive ? (
            <button type="button" className="play-btn">
              <MdPauseCircleFilled className="pause-icon" />
            </button>
          ) : (
            <button type="button" className="play-btn">
              <IoMdPlayCircle className="play-icon" />
            </button>
          )}
          <span className="mobile-track-artist">{trackArtist}</span>
        </span>
        <span className="album-song-duration">{songDuration}</span>
      </div>
    </li>
  )
}
export default AlbumItem
