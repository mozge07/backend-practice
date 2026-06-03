import { RouterProvider } from "react-router"
import Approutes from "./Approutes"
import { AuthProvider } from "./features/auth/auth.context.jsx" 
import './style.scss'

function App() {

  return (
    <AuthProvider>
    <Approutes />
    </AuthProvider>
  )
}

export default App
