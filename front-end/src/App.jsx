import {RouterProvider} from 'react-router'
import './style.scss'
import {router} from './app.routes.jsx'
import { AuthProvider } from './feature/auth/auth.context.jsx'

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />

    </AuthProvider>
      
    
  )
}

export default App
