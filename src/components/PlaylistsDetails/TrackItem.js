import {useState} from 'react'
import {formatDistanceToNow} from 'date-fns'
import {IoMdPlayCircle} from 'react-icons/io'
import {MdPauseCircleFilled} from 'react-icons/md'

import './trackItem.css'

const getDuration = trackDuration => {
  const totalSeconds = Math.floor(trackDuration / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = trackDuration % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

const TrackItem = props => {
  const {details, updateId, isActive} = props
  const {added, artistName, trackId, trackName, trackDuration, albumType} =
    details
  const activeClas = isActive && 'active-track'
  const activeTrack = isActive && 'active-mobile-track'
  const addedTime = formatDistanceToNow(new Date(added), {addSuffix: true})
  const songDuration = getDuration(trackDuration)

  return (
    <>
      <li
        onClick={() => updateId(trackId)}
        className={`track-list-item ${activeClas}`}
      >
        <div className="track-item-box">
          <span className="trackName">
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
          </span>
          <span className="album">{albumType}</span>
          <span className="duration">{songDuration}</span>
          <span className="artistName">{artistName}</span>
          <span className="releaseDate">{addedTime.slice(6)}</span>
        </div>
      </li>

      <li
        onClick={() => updateId(trackId)}
        className={`track-list-item-mobile ${activeTrack}`}
      >
        <div className="track-item-mobile-box">
          <div className="track-details-mobile">
            <div className="track-names">
              <span className="track-item-mobile-name">{trackName}</span>
              <span className="track-item-mobile-artist">{artistName}</span>
            </div>
          </div>
          <span className="mobile-track-duration">{songDuration}</span>
        </div>
      </li>
    </>
  )
}
export default TrackItem
