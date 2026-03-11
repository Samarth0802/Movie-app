import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { loginUser, registerUser, getMe, logoutUser } from '../../features/auth/service/authApi.service'

// ─── Thunks ──────────────────────────────────────────────

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (formData, thunkAPI) => {
    try {
      const res = await loginUser(formData.identifier, formData.password)
      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || 'Login failed')
    }
  }
)

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (formData, thunkAPI) => {
    try {
      const res = await registerUser(formData.username, formData.email, formData.password)
      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || 'Registration failed')
    }
  }
)

export const getMeThunk = createAsyncThunk(
  'auth/getMe',
  async (_, thunkAPI) => {
    try {
      const res = await getMe()
      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || 'Auth check failed')
    }
  }
)

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await logoutUser()
      return null
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || 'Logout failed')
    }
  }
)

// ─── Slice ───────────────────────────────────────────────

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user:            null,
    isAuthenticated: false,
    role:            null,   // 'admin' | 'user'
    loading:         false,
    error:           null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder

      // ── Login ─────────────────────────────────────────
      .addCase(loginThunk.pending, (state) => {
        state.loading = true
        state.error   = null
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading         = false
        state.user            = action.payload.user
        state.isAuthenticated = true
        state.role            = action.payload.user.role
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false
        state.error   = action.payload
      })

      // ── Register ──────────────────────────────────────
      .addCase(registerThunk.pending, (state) => {
        state.loading = true
        state.error   = null
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.loading         = false
        state.user            = action.payload.user
        state.isAuthenticated = true
        state.role            = action.payload.user.role
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.loading = false
        state.error   = action.payload
      })

      // ── Get Me (app load pe check) ────────────────────
      .addCase(getMeThunk.pending, (state) => {
        state.loading = true
      })
      .addCase(getMeThunk.fulfilled, (state, action) => {
        state.loading         = false
        state.user            = action.payload.user
        state.isAuthenticated = true
        state.role            = action.payload.user.role
      })
      .addCase(getMeThunk.rejected, (state) => {
        state.loading         = false
        state.user            = null
        state.isAuthenticated = false
        state.role            = null
      })

      // ── Logout ────────────────────────────────────────
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user            = null
        state.isAuthenticated = false
        state.role            = null
        state.error           = null
      })
  },
})

export const { clearError } = authSlice.actions
export default authSlice.reducer