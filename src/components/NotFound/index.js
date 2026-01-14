import {Link} from 'react-router-dom'
import {GoArrowLeft} from 'react-icons/go'
import Header from '../Header'
import './index.css'

const NotFound = () => (
  <div className="notfound-container">
    <Header />
    <div className="notfound-box">
      <Link style={{textDecoration: 'none'}} to="/">
        <button className="back-btn" type="button">
          <GoArrowLeft className="back-icon" />
          Back
        </button>
      </Link>
      <div className="notfound-card">
        <h1 className="notfound-text">404</h1>
        <p className="notfound-para">Page Not Found</p>
      </div>
    </div>
  </div>
)
export default NotFound
