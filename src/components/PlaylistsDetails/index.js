import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import {GoArrowLeft} from 'react-icons/go'
import TrackItem from './TrackItem'
import Header from '../Header'
import MusicPlayer from './musicPlayer'
import './index.css'
import '../hover.css'

const apiConstants = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

const PlaylistsDetails = props => {
  const [tracklist, setList] = useState([])
  const [apiStatus, setStatus] = useState(apiConstants.initial)
  const [curentTrack, setId] = useState()

  const updateId = newId => {
    setId(newId)
  }

  const getFormatedData = data => {
    const updatedData = {
      id: data.id,
      name: data.name,
      playlistImg: data.images[0].url,
      ownerName: data.owner.display_name,
      tracks: data.tracks.items.map(each => ({
        added: each.added_at,
        artistName: each.track.album.artists[0].name,
        trackId: each.track.id,
        trackName: each.track.album.name,
        releaseDate: each.track.album.release_date,
        trackPlayImage: each.track.album.images[2].url,
        trackDuration: each.track.duration_ms,
        trackUrl: each.track.external_urls.spotify,
        songPreviewUrl: each.track.preview_url,
        albumType: each.track.album.type,
      })),
    }
    return updatedData
  }

  const getApicall = async () => {
    setStatus(apiConstants.loading)
    const {match} = props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis2.ccbp.in/spotify-clone/playlists-details/${id}`
    const option = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, option)
    try {
      if (response.ok) {
        const data = await response.json()
        const formatedData = getFormatedData(data)
        setList(formatedData)
        setStatus(apiConstants.success)
      } else {
        setStatus(apiConstants.failure)
        throw new Error('api call Failed')
      }
    } catch (er) {
      console.log(er)
    }
  }

  useEffect(() => {
    getApicall()
  }, [])
  // pc view
  const renderLoadingView = () => (
    <div className="playlist-loading-view">
      <div>
        <img
          className="loading-img"
          src="https://res.cloudinary.com/dxrdjcafp/image/upload/v1766666278/music_qadvho.png"
          alt="loading view"
        />
        <p className="loading-text">Loading...</p>
      </div>
    </div>
  )

  const renderFailureView = () => (
    <div className="playlist-failure-container">
      <div className="failure-container">
        <img
          className="failure-img"
          src="https://res.cloudinary.com/dxrdjcafp/image/upload/v1766666227/Icon_ioaawt.png"
          alt="failure view"
        />
        <p>Something went wrong. Please try again</p>
        <button
          type="button"
          onClick={getApicall}
          className="try-again btn-hover"
        >
          Try Again
        </button>
      </div>
    </div>
  )

  const renderSuccessViewPc = () => {
    const {name, playlistImg, ownerName, tracks} = tracklist

    return (
      <div>
        <div className="playlist-top-box">
          <div>
            <img className="playlist-img" src={playlistImg} alt="playlist" />
          </div>
          <div className="playlist-text-box">
            <p>Editor's picks</p>
            <h1 className="playlist-name">{name}</h1>
            <p>{ownerName}</p>
          </div>
        </div>
        <ol className="track-list">
          <div className="track-header">
            <span className="track">Track</span>
            <span className="album">Album</span>
            <span className="time">Time</span>
            <span className="artist">Artist</span>
            <span className="added">Added</span>
          </div>
          <hr />
          {tracks.map(each => (
            <TrackItem
              key={each.trackId}
              isActive={each.trackId === curentTrack}
              updateId={updateId}
              details={each}
            />
          ))}
        </ol>
      </div>
    )
  }

  const renderUI = () => {
    switch (apiStatus) {
      case apiConstants.loading:
        return renderLoadingView()
      case apiConstants.success:
        return renderSuccessViewPc()
      case apiConstants.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  // mobile view

  const renderMobileLoading = () => (
    <div className="playlist-loading-mobile-view">
      <div>
        <img
          className="loading-img-mobile"
          src="https://res.cloudinary.com/dxrdjcafp/image/upload/v1766666278/music_qadvho.png"
          alt="loading view"
        />
        <p className="loading-text-mobile">Loading...</p>
      </div>
    </div>
  )

  const renderMobileFailure = () => (
    <div className="playlist-failure-container">
      <div className="failure-container">
        <img
          className="failure-img"
          src="https://res.cloudinary.com/dxrdjcafp/image/upload/v1766666227/Icon_ioaawt.png"
          alt="failure view"
        />
        <p>Something went wrong. Please try again</p>
        <button
          type="button"
          onClick={getApicall}
          className="try-again btn-hover"
        >
          Try Again
        </button>
      </div>
    </div>
  )

  const renderMobileSuccess = () => {
    const {name, playlistImg, ownerName, tracks} = tracklist
    return (
      <div>
        <div className="playlist-top-box-mobile">
          <img
            className="playlist-top-box-image-mobile"
            src={playlistImg}
            alt="playlist"
          />
          <h1>{name}</h1>
          <p className="playlist-top-box-mobile-ownerName">{ownerName}</p>
        </div>
        <ol className="track-list-mobile">
          {tracks.map(each => (
            <TrackItem
              key={each.trackId}
              isActive={each.trackId === curentTrack}
              updateId={updateId}
              details={each}
            />
          ))}
        </ol>
      </div>
    )
  }

  const rednerMobileView = () => {
    switch (apiStatus) {
      case apiConstants.loading:
        return renderMobileLoading()
      case apiConstants.success:
        return renderMobileSuccess()
      case apiConstants.failure:
        return renderMobileFailure()
      default:
        return null
    }
  }

  const renderPlaySection = () => {
    if (curentTrack) {
      const {tracks} = tracklist
      const trackDetails = tracks.filter(each => each.trackId === curentTrack)
      const {
        artistName,
        songPreviewUrl,
        trackName,
        trackPlayImage,
      } = trackDetails[0]

      return (
        <>
          <div className="play-box">
            <div className="spotify-api">
              <div className="mini-player-box">
                <img className="spotify-img" src={trackPlayImage} alt="track" />
                <div className="mini-player-text">
                  <p className="mini-track-name">{trackName}</p>
                  <p className="mini-artist-name">{artistName}</p>
                </div>
              </div>
              <MusicPlayer track={songPreviewUrl} />
            </div>
          </div>

          <div className="mobile-play-box">
            <div className="mobile-mini-player">
              <img
                className="mini-player-img"
                src={trackPlayImage}
                alt="track"
              />
              <div>
                <p className="mini-player-track-name">{trackName}</p>
                <p className="mini-player-track-artist">{artistName}</p>
              </div>
            </div>
            <MusicPlayer track={songPreviewUrl} />
          </div>
        </>
      )
    }
  }

  return (
    <>
      <div className="playlist-details-pc-view-container">
        <Header />
        <div className="playlist-container-pc-view">
          <Link to="/" className="back-to-home-icon">
            <GoArrowLeft />
            <p>Back</p>
          </Link>
          {renderUI()}
          {renderPlaySection()}
        </div>
      </div>
      <div className="playlist-details-mobile-view">
        <Link to="/" className="back-to-home-mobile-icon">
          <GoArrowLeft />
          <p>Back</p>
        </Link>
        {rednerMobileView()}
        {renderPlaySection()}
      </div>
    </>
  )
}

export default PlaylistsDetails
