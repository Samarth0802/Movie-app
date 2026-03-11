import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  loginThunk,
  registerThunk,
  logoutThunk,
  getMeThunk,
  clearError,
} from '../../../redux/slice/authSlice'

const useAuth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // ─── State from Redux ──────────────────────────────────
  const { user, isAuthenticated, role, loading, error } = useSelector(
    (state) => state.auth
  )

  // ─── Login ─────────────────────────────────────────────
  const login = async (identifier, password) => {
    const result = await dispatch(loginThunk({ identifier, password }))

    if (loginThunk.fulfilled.match(result)) {
      const userRole = result.payload.user.role
      userRole === 'admin' ? navigate('/admin') : navigate('/')
    }
  }

  // ─── Register ──────────────────────────────────────────
  const register = async (username, email, password) => {
    const result = await dispatch(registerThunk({ username, email, password }))

    if (registerThunk.fulfilled.match(result)) {
      navigate('/')
    }
  }

  // ─── Logout ────────────────────────────────────────────
  const logout = async () => {
    await dispatch(logoutThunk())
    navigate('/login')
  }

  // ─── Check Auth (app load pe) ──────────────────────────
  const checkAuth = async () => {
    await dispatch(getMeThunk())
  }

  // ─── Clear Error ───────────────────────────────────────
  const resetError = () => {
    dispatch(clearError())
  }

  return {
    // state
    user,
    isAuthenticated,
    role,
    loading,
    error,
    // actions
    login,
    register,
    logout,
    checkAuth,
    resetError,
  }
}

export default useAuth