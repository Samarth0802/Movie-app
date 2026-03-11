import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../Hooks/useAuth'
import '../styles/auth.scss'

const LoginPage = () => {
  const [form, setForm]         = useState({ identifier: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const { login, loading, error, resetError, isAuthenticated } = useAuth()

  useEffect(() => { resetError() }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (error) resetError()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()  
    await login(form.identifier, form.password)
  }

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-left__bg" />
        <div className="auth-left__overlay" />
        <div className="auth-left__content">
          <span className="auth-left__logo">CINEVERSE</span>
          <div className="auth-left__tagline">
            <h2>Your World of Cinema Awaits</h2>
            <p>Millions of movies, TV shows and people to discover.</p>
          </div>
          <div className="auth-left__stats">
            <div className="auth-left__stat"><strong>10K+</strong><span>Movies</span></div>
            <div className="auth-left__stat"><strong>5K+</strong><span>TV Shows</span></div>
            <div className="auth-left__stat"><strong>1M+</strong><span>Users</span></div>
          </div>
        </div>
      </div>
      <div className="auth-right">
        <div className="auth-card">
          <span className="auth-card__logo">CINEVERSE</span>
          <h1 className="auth-card__title">Welcome Back</h1>
          <p className="auth-card__subtitle">Sign in to continue your movie journey</p>
          {error && <div className="auth-error">⚠ {error}</div>}
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="identifier">Email or Username</label>
              <div className="form-group__input-wrap">
                <span className="input-icon">✉</span>
                <input id="identifier" type="text" name="identifier" className="input"
                  placeholder="email or username" value={form.identifier}
                  onChange={handleChange} required autoComplete="username" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="form-group__input-wrap">
                <span className="input-icon">🔒</span>
                <input id="password" type={showPass ? 'text' : 'password'} name="password"
                  className="input" placeholder="••••••••" value={form.password}
                  onChange={handleChange} required autoComplete="current-password" />
                <button type="button" className="password-toggle" onClick={() => setShowPass(!showPass)}>
                  {showPass ? '🙈' : '👁'}
                </button>
              </div>
            </div>
            <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
              {loading ? <span className="spinner" /> : 'Sign In'}
            </button>
          </form>
          <p className="auth-switch">Don't have an account? <Link to="/register">Sign Up</Link></p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage