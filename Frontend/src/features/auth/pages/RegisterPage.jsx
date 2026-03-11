import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../Hooks/useAuth'
import '../styles/auth.scss'

const RegisterPage = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '' })
  const [showPass, setShowPass]   = useState(false)
  const [localError, setLocalError] = useState('')
  const { register, loading, error, resetError } = useAuth()

  useEffect(() => { resetError() }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (localError) setLocalError('')
    if (error) resetError()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) { setLocalError('Passwords do not match!'); return }
    if (form.password.length < 6) { setLocalError('Password must be at least 6 characters'); return }
    await register(form.username, form.email, form.password)
  }

  const displayError = localError || error

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-left__bg" />
        <div className="auth-left__overlay" />
        <div className="auth-left__content">
          <span className="auth-left__logo">CINEVERSE</span>
          <div className="auth-left__tagline">
            <h2>Join Millions of Movie Lovers</h2>
            <p>Create your free account and start exploring the world of cinema.</p>
          </div>
          <div className="auth-left__stats">
            <div className="auth-left__stat"><strong>Free</strong><span>Forever</span></div>
            <div className="auth-left__stat"><strong>HD</strong><span>Trailers</span></div>
            <div className="auth-left__stat"><strong>∞</strong><span>Watchlist</span></div>
          </div>
        </div>
      </div>
      <div className="auth-right">
        <div className="auth-card">
          <span className="auth-card__logo">CINEVERSE</span>
          <h1 className="auth-card__title">Create Account</h1>
          <p className="auth-card__subtitle">Start your cinematic journey for free</p>
          {displayError && <div className="auth-error">⚠ {displayError}</div>}
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <div className="form-group__input-wrap">
                <span className="input-icon">👤</span>
                <input id="username" type="text" name="username" className="input"
                  placeholder="coolname123" value={form.username} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="form-group__input-wrap">
                <span className="input-icon">✉</span>
                <input id="email" type="email" name="email" className="input"
                  placeholder="your@email.com" value={form.email} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="form-group__input-wrap">
                <span className="input-icon">🔒</span>
                <input id="password" type={showPass ? 'text' : 'password'} name="password"
                  className="input" placeholder="Min. 6 characters" value={form.password}
                  onChange={handleChange} required minLength={6} />
                <button type="button" className="password-toggle" onClick={() => setShowPass(!showPass)}>
                  {showPass ? '🙈' : '👁'}
                </button>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="form-group__input-wrap">
                <span className="input-icon">🔒</span>
                <input id="confirmPassword" type={showPass ? 'text' : 'password'} name="confirmPassword"
                  className="input" placeholder="Repeat password" value={form.confirmPassword}
                  onChange={handleChange} required />
              </div>
            </div>
            <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
              {loading ? <span className="spinner" /> : 'Create Account'}
            </button>
          </form>
          <p className="auth-switch">Already have an account? <Link to="/login">Sign In</Link></p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage