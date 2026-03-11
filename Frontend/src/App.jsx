import React, { useEffect } from 'react'
import AllRoutes from './AllRoutes.jsx'
import { store } from './redux/store.js'
import { Provider } from 'react-redux'
import { getMeThunk } from './redux/slice/authSlice.js'
import { useDispatch } from 'react-redux'
const AppContent = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMeThunk())  // ← app load hote hi user check karo
  }, [])

  return <AllRoutes />
}

const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  )
}

export default App