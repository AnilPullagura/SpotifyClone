import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', errMsg: ''}

  changeUsername = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  renderFormField = () => {
    const {username} = this.state
    return (
      <div className="field-box">
        <label htmlFor="username">USERNAME</label>
        <input
          onChange={this.changeUsername}
          value={username}
          type="text"
          id="username"
          className="form-input"
          placeholder="username"
        />
      </div>
    )
  }
  renderpasswordField = () => {
    const {password} = this.state
    return (
      <div className="field-box">
        <label htmlFor="password">PASSWORD</label>
        <input
          onChange={this.changePassword}
          value={password}
          type="password"
          id="password"
          className="form-input"
          placeholder="password"
        />
      </div>
    )
  }

  loginSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  loginFailure = err => {
    this.setState({errMsg: err})
  }

  submitForm = event => {
    event.preventDefault()
    this.getApicall()
  }

  getApicall = async () => {
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      this.loginSuccess(data.jwt_token)
    } else {
      const data = await response.json()
      this.loginFailure(data.error_msg)
    }
  }

  render() {
    const {errMsg} = this.state
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

          <form onSubmit={this.submitForm}>
            {this.renderFormField()}
            {this.renderpasswordField()}
            <button type="submit" className="login-btn">
              Login
            </button>
            {errMsg && <p className="err-msg">* {errMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default Login
