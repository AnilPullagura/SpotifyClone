import {Link, withRouter} from 'react-router-dom'
import {useState} from 'react'
import Cookies from 'js-cookie'
import {IoMdLogOut, IoMdClose} from 'react-icons/io'
import {CgProfile} from 'react-icons/cg'

import './index.css'

const Header = props => {
  const [isopen, setStatus] = useState(false)

  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  const closeSidebar = () => {
    setStatus(prevState => !prevState)
  }

  const goToHome = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <>
      <div className="mobile-hide">
        <div className="header-container-mobile-view">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dxrdjcafp/image/upload/v1766666278/music_qadvho.png"
              alt="website logo"
              className="header-logo-img"
            />
          </Link>

          <img
            onClick={closeSidebar}
            src="https://res.cloudinary.com/dxrdjcafp/image/upload/v1767516013/menu_ujlkem.png"
            alt="nav"
          />
        </div>
        <div className={`sidebar ${isopen ? 'open' : ''}`}>
          <button
            onClick={closeSidebar}
            type="button"
            className="humberger-btn"
          >
            <IoMdClose className="close" />
          </button>
          <div className="profile-box">
            <CgProfile className="profile" />
            <div className="btn-list">
              <button className="log-out-btn" onClick={goToHome}>
                Go Home
              </button>
              <button type="button" onClick={onLogout} className="log-out-btn">
                Log Out
                <IoMdLogOut className="log-out-icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="header-pc-view">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/dxrdjcafp/image/upload/v1766666278/music_qadvho.png"
            alt="login website logo"
            className="header-logo-img"
          />
        </Link>
        <button type="button" onClick={onLogout} className="log-out-btn">
          <IoMdLogOut className="log-out-icon" /> Log Out
        </button>
      </div>
    </>
  )
}
export default withRouter(Header)
