import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../../features/auth/Hooks/useAuth'
import '../styles/Navbar.scss'

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const { user, isAuthenticated, logout } = useAuth()

  // ── Close dropdown on outside click ──────────────────
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleLogout = async () => {
    setDropdownOpen(false)
    await logout()
  }

  return (
    <nav className="navbar">
      <div className="navbar__inner">

        {/* ── Left — App Name ── */}
        <Link to="/" className="navbar__logo">
          CINEVERSE
        </Link>

        {/* ── Right ── */}
        <div className="navbar__right">
          {isAuthenticated && user ? (
            <div className="navbar__profile" ref={dropdownRef}>

              {/* Username Button */}
              <button
                className="navbar__username"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {/* Avatar */}
                <div className="navbar__avatar">
                  {user.username?.[0]?.toUpperCase()}
                </div>
                <span>{user.username}</span>
                <svg
                  className={`navbar__chevron ${dropdownOpen ? 'open' : ''}`}
                  width="14" height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="navbar__dropdown">

                  {/* User Info */}
                  <div className="dropdown__header">
                    <div className="dropdown__avatar">
                      {user.username?.[0]?.toUpperCase()}
                    </div>
                    <div>
                      <p className="dropdown__name">{user.username}</p>
                      <p className="dropdown__email">{user.email}</p>
                    </div>
                  </div>

                  <div className="dropdown__divider" />

                  {/* Options */}
                  <Link
                    to="/favorites"
                    className="dropdown__item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <span className="dropdown__icon">❤️</span>
                    Favorites
                  </Link>

                  <Link
                    to="/history"
                    className="dropdown__item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <span className="dropdown__icon">🕐</span>
                    Watch History
                  </Link>

                  {/* Admin only */}
                  {user.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="dropdown__item"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <span className="dropdown__icon">⚙️</span>
                      Admin Panel
                    </Link>
                  )}

                  <div className="dropdown__divider" />

                  <button
                    className="dropdown__item dropdown__item--logout"
                    onClick={handleLogout}
                  >
                    <span className="dropdown__icon">🚪</span>
                    Logout
                  </button>

                </div>
              )}
            </div>
          ) : (
            <div className="navbar__auth">
              <Link to="/login"    className="btn btn-ghost">Login</Link>
              <Link to="/register" className="btn btn-primary">Sign Up</Link>
            </div>
          )}
        </div>

      </div>
    </nav>
  )
}

export default Navbar