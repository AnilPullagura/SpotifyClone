import {useState} from 'react'
import Cookies from 'js-cookie'
import {Redirect, useHistory} from 'react-router-dom'

import './index.css'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const history = useHistory()

  const loginSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  const loginFailure = err => {
    setErrMsg(err)
  }

  const submitForm = async event => {
    event.preventDefault()
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      loginSuccess(data.jwt_token)
    } else {
      loginFailure(data.error_msg)
    }
  }

  const useSampleData = () => {
    setUsername('rahul')
    setPassword('rahul@2021')
  }

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Redirect to="/" />
  }

  return (
    <div className="login-main-container">
      <div className="login-content-container">
        <div className="logo-container">
          <img
            src="https://res.cloudinary.com/dxrdjcafp/image/upload/v1766666278/music_qadvho.png"
            alt="login website logo"
            className="logo-img"
          />
          <h1 className="logo-text">Spotify Remix</h1>
        </div>

        <form onSubmit={submitForm}>
          <div className="field-box">
            <label htmlFor="username">USERNAME</label>
            <input
              onChange={e => setUsername(e.target.value)}
              value={username}
              type="text"
              id="username"
              className="form-input"
              placeholder="username"
            />
          </div>

          <div className="field-box">
            <label htmlFor="password">PASSWORD</label>
            <input
              onChange={e => setPassword(e.target.value)}
              value={password}
              type="password"
              id="password"
              className="form-input"
              placeholder="password"
            />
          </div>
          <div className="btn-box">
            <button type="submit" className="login-btn">
              Login
            </button>
            <button
              type="button"
              onClick={useSampleData}
              className="sample-btn login-btn"
            >
              Sample Data
            </button>
          </div>
          {errMsg && <p className="err-msg">* {errMsg}</p>}
        </form>
      </div>
    </div>
  )
}

export default Login
