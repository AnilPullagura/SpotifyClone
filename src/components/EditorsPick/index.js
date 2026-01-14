import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import EditorsItem from '../EditorsItem'
import './index.css'
import '../hover.css'

const apiConstants = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

const EditorsPick = () => {
  const [apiStatus, setStatus] = useState(apiConstants.initial)
  const [albumData, setAlbum] = useState([])

  const getFormatData = data => {
    const updateData = data.map(each => ({
      id: each.id,
      albumThumbnail: each.images[0].url,
      name: each.name,
    }))
    return updateData
  }

  const getApicall = async () => {
    setStatus(apiConstants.loading)
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis2.ccbp.in/spotify-clone/featured-playlists'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    try {
      if (response.ok === true) {
        const data = await response.json()
        const formatedData = getFormatData(data.playlists.items)
        setAlbum(formatedData)
        setStatus(apiConstants.success)
      } else {
        setStatus(apiConstants.failure)
        throw new Error(`Api call failed`)
      }
    } catch (er) {
      console.log(er)
      setStatus(apiConstants.failure)
    }
  }

  useEffect(() => {
    getApicall()
  }, [])

  const renderFailureView = () => (
    <div className="error-container ">
      <img
        src="https://res.cloudinary.com/dxrdjcafp/image/upload/v1766666227/Icon_ioaawt.png"
        alt="failure view"
      />
      <p className="error-text">Something went wrong. Please try again</p>
      <button
        type="button"
        onClick={getApicall}
        className="try-again btn-hover"
      >
        Try Again
      </button>
    </div>
  )

  const renderLoadingView = () => (
    <div className="error-container loading-view">
      <img
        src="https://res.cloudinary.com/dxrdjcafp/image/upload/v1766666278/music_qadvho.png"
        alt="failure logo"
      />
      <h1>Loading...</h1>
    </div>
  )

  const renderSuccessView = () => (
    <div className="album-box">
      <ul className="album-list">
        {albumData.map(each => (
          <EditorsItem details={each} key={each.id} />
        ))}
      </ul>
    </div>
  )

  const renderUI = () => {
    switch (apiStatus) {
      case apiConstants.loading:
        return renderLoadingView()
      case apiConstants.success:
        return renderSuccessView()
      case apiConstants.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  return (
    <div>
      <h1 className="editor-text">Editor's picks</h1>
      {renderUI()}
    </div>
  )
}

export default EditorsPick
