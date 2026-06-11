import { RouterProvider } from "react-router-dom"
import {router} from "./Approutes.jsx"
import { AuthProvider } from "./features/auth/auth.context.jsx" 
import './style.scss'
import { PostContextProvider } from "./features/posts/post.context.jsx"

function App() {

  return (
    <AuthProvider>
      <PostContextProvider>
        <RouterProvider router={router}/>
      </PostContextProvider>
   </AuthProvider>
  )
}

export default App
