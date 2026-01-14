import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import NewReleasesItem from '../NewReleaseItem'
import './index.css'

const apiConstants = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

const NewReleases = () => {
  const [apiStatus, setStatus] = useState(apiConstants.initial)
  const [newReleases, setList] = useState([])

  const gotFormatdata = data => {
    const updateData = data.map(each => ({
      id: each.id,
      name: each.name,
      imageUrl: each.images[0].url,
    }))
    return updateData
  }

  const getApicall = async () => {
    const jwtToken = Cookies.get('jwt_token')
    setStatus(apiConstants.loading)
    const url = 'https://apis2.ccbp.in/spotify-clone/new-releases'
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
        const formatedData = gotFormatdata(data.albums.items)
        setList(formatedData)
        setStatus(apiConstants.success)
      } else {
        setStatus(apiConstants.failure)
        throw new Error('Api Error')
      }
    } catch (er) {
      console.log(er)
    }
  }

  useEffect(() => {
    getApicall()
  }, [])

  const renderFailureview = () => (
    <div className="error-container">
      <img
        src="https://res.cloudinary.com/dxrdjcafp/image/upload/v1766666227/Icon_ioaawt.png"
        alt="failure view"
      />
      <p className="error-text">Something went wrong. Please try again</p>
      <button type="button" onClick={getApicall} className="try-again">
        Try Again
      </button>
      <img src={newReleases} />
    </div>
  )

  const renderLoadingView = () => (
    <div className="error-container loading-view ">
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
        {newReleases.map(each => (
          <NewReleasesItem details={each} key={each.id} />
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
        return renderFailureview()
      default:
        return null
    }
  }
  return (
    <div>
      <h1 className="editor-text">New releases</h1>
      {renderUI()}
    </div>
  )
}

export default NewReleases
