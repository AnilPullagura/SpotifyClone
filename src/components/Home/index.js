import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import EditorsPick from '../EditorsPick'
import Genres from '../Genres'
import NewReleases from '../NewReleases'
import './index.css'

const Home = props => {
  const [apiStatus, setStatus] = useState('')
  return (
    <div className="home-container">
      <Header />
      <div className="home-content-container">
        <EditorsPick />
        <Genres />
        <NewReleases />
      </div>
    </div>
  )
}

export default Home
