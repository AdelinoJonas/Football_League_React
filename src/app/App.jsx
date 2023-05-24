import { AuthProvider } from '../context/authContext'
import { Home } from '../pages/Home'
import { Login } from '../pages/Login'

function App() {

  return (
    <AuthProvider>
      <Login />
      <Home />
    </AuthProvider>
  )
}

export default App
