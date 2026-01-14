import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import {GoArrowLeft} from 'react-icons/go'
import Header from '../Header'
import CategoryPlaylistItem from '../CategoryPlaylistItem'
import './index.css'
import '../hover.css'

const apiConstants = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

const CategoryPlaylistsDetails = props => {
  const [podcastList, setList] = useState([])
  const [apiStatus, setStatus] = useState(apiConstants.failure)

  const getFormated = data => {
    const updateData = data.playlists.items.map(each => ({
      id: each.id,
      podcastImg: each.images[0].url,
      podcastName: each.name,
      totalTracks: each.tracks.total,
    }))
    return updateData
  }

  const getApiCall = async () => {
    setStatus(apiConstants.loading)
    const jwtToken = Cookies.get('jwt_token')
    const {match} = props
    const {params} = match
    const {id} = params
    const url = `https://apis2.ccbp.in/spotify-clone/category-playlists/${id}`
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
        const formatedList = getFormated(data)
        setList(formatedList)
        setStatus(apiConstants.success)
      } else {
        setStatus(apiConstants.failure)
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
      <button
        type="button"
        onClick={getApiCall}
        className="try-again btn-hover"
      >
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

  const renderSuccessview = () => (
    <div>
      <ul className="podcast-list">
        {podcastList.map(each => (
          <CategoryPlaylistItem details={each} key={each.id} />
        ))}
      </ul>
    </div>
  )

  const renderUI = () => {
    switch (apiStatus) {
      case apiConstants.loading:
        return renderLoadingView()
      case apiConstants.failure:
        return renderFailureView()
      case apiConstants.success:
        return renderSuccessview()
      default:
        return null
    }
  }

  return (
    <div className="category-details-container">
      <div className="category-header">
        <Header />
      </div>
      <div className="category-main-container">
        <Link style={{textDecoration: 'none'}} to="/">
          <button className="category-link-btn" type="button">
            <GoArrowLeft />
            Back
          </button>
        </Link>
        <h1 className="podcast">Podcast</h1>
        {renderUI()}
      </div>
    </div>
  )
}
export default CategoryPlaylistsDetails
