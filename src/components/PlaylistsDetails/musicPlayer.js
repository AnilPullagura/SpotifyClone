import {useState} from 'react'
import {IoMdPlayCircle} from 'react-icons/io'
import {MdPauseCircleFilled} from 'react-icons/md'
import './musicPlayer.css'

const MusicPlayer = props => {
  const [isPlaying, setPlaying] = useState(false)
  const [volume, setVloume] = useState(0.8)
  const [currentTime, setTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const {track} = props

  const format = time => {
    const minutes = Math.floor(time / 60)
    const sec = Math.floor(time % 60)
      .toString()
      .padStart(2, '0')
    return `${minutes}:${sec}`
  }

  return (
    <>
      <div className="music-player">
        <audio
          id="player"
          src={track}
          volume={volume}
          onLoadedMetadata={e => setDuration(e.target.duration)}
          onTimeUpdate={e => setTime(e.target.currentTime)}
        />

        <button
          className="music-controll"
          type="button"
          onClick={() => {
            const audio = document.getElementById('player')
            if (isPlaying) {
              audio.pause()
            } else {
              audio.play()
            }
            setPlaying(!isPlaying)
          }}
        >
          {isPlaying ? (
            <MdPauseCircleFilled className="play" />
          ) : (
            <IoMdPlayCircle className="play" />
          )}
        </button>
        <div>
          <input
            className="seek"
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={e => {
              const audio = document.getElementById('player')
              audio.currentTime = e.target.value
              setTime(e.target.value)
            }}
          />
          <span>{format(currentTime)}</span>/<span>{format(duration)}</span>
        </div>
      </div>
      <div className="mobile-music-player">
        <audio id="audio-player" src={track} />
        <button
          type="button"
          className="mobile-controls"
          onClick={() => {
            const audio = document.getElementById('audio-player')
            if (isPlaying) {
              audio.pause()
            } else {
              audio.play()
            }
            setPlaying(prevState => !prevState)
          }}
        >
          {isPlaying ? (
            <MdPauseCircleFilled className="mobile-play" />
          ) : (
            <IoMdPlayCircle className="mobile-play" />
          )}
        </button>
      </div>
    </>
  )
}

export default MusicPlayer
