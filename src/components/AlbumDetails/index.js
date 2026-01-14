import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import {GoArrowLeft} from 'react-icons/go'
import Header from '../Header'
import AlbumItem from './AlbumItem'
import MusicPlayer from './musicPlayer'
import './index.css'
import '../hover.css'

const apiConstans = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

const AlbumDetails = props => {
  const [apistatus, setStatus] = useState(apiConstans.initial)
  const [albumDetails, setAlbum] = useState()
  const [activeItem, setItem] = useState()

  const onchangeItem = activeID => {
    setItem(activeID)
  }

  const getFormated = data => {
    const upadateData = {
      id: data.id,
      albumImage: data.images[0].url,
      name: data.name,
      artistName: data.artists[0].name,
      tracks: data.tracks.items.map(each => ({
        trackid: each.id,
        trackDuration: each.duration_ms,
        trackName: each.name,
        trackUrl: each.preview_url,
        trackArtist: each.artists[0].name,
      })),
    }
    return upadateData
  }

  const getApiCall = async () => {
    setStatus(apiConstans.loading)
    const {match} = props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis2.ccbp.in/spotify-clone/album-details/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    try {
      if (response.ok) {
        const data = await response.json()

        const formatedData = getFormated(data)
        setAlbum(formatedData)
        setStatus(apiConstans.success)
      } else {
        setStatus(apiConstans.failure)
        throw new Error('Api call failed')
      }
    } catch (er) {
      console.log(er)
    }
  }

  useEffect(() => {
    getApiCall()
  }, [])

  const renderFailureView = () => (
    <div className="error-container">
      <img
        src="https://res.cloudinary.com/dxrdjcafp/image/upload/v1766666227/Icon_ioaawt.png"
        alt="failure view"
      />
      <p className="error-text">Something went wrong. Please try again</p>
      <button type="button" className="try-again btn-hover">
        Try Again
      </button>
    </div>
  )

  const renderLoadingView = () => (
    <div className="error-container loading-view ">
      <img
        src="https://res.cloudinary.com/dxrdjcafp/image/upload/v1766666278/music_qadvho.png"
        alt="loading logo"
      />
      <h1>Loading...</h1>
    </div>
  )

  const renderSucessView = () => {
    const {id, albumImage, name, artistName, tracks} = albumDetails
    return (
      <div className="album-container">
        <div className="album-top-box">
          <img className="album-top-img" src={albumImage} alt="album" />
          <div className="album-top-text-box">
            <p className="album-name-text">New Releases</p>
            <h1 className="album-text">{name}</h1>
            <p className="album-artist-name">{artistName}</p>
          </div>
        </div>
        <ol className="album-details-list">
          <li key="0" className="album-details-item">
            <span>Track</span>
            <span>Time</span>
          </li>
          <hr className="album-hr-mobile" />
          {tracks.map(each => (
            <AlbumItem
              details={each}
              key={each.trackid}
              onchangeItem={onchangeItem}
              isActive={each.trackid === activeItem}
            />
          ))}
        </ol>
      </div>
    )
  }

  const renderPlaySection = () => {
    if (activeItem) {
      const {tracks} = albumDetails
      const trackDetails = tracks.filter(each => each.trackid === activeItem)
      const {trackName, trackUrl, trackArtist} = trackDetails[0]
      return (
        <div className="album-music-player">
          <div>
            <p className="player-track-name">{trackName}</p>
            <p className="player-artist-name">{trackArtist}</p>
          </div>
          <MusicPlayer track={trackUrl} />
        </div>
      )
    }
  }

  const renderUI = () => {
    switch (apistatus) {
      case apiConstans.loading:
        return renderLoadingView()
      case apiConstans.failure:
        return renderFailureView()
      case apiConstans.success:
        return renderSucessView()
      default:
        return null
    }
  }

  return (
    <div className="album-details-container">
      <div className="mobile-album-header">
        <Header />
      </div>
      <div className="album-details-main-container">
        <Link style={{textDecoration: 'none'}} to="/">
          <button className="album-link" type="button">
            <GoArrowLeft />
            Back
          </button>
        </Link>
        {renderUI()}
        {renderPlaySection()}
      </div>
    </div>
  )
}

export default AlbumDetails
