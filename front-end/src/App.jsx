import {RouterProvider} from 'react-router-dom'
// import './style.scss'
import {router} from './app.routes.jsx'
import { AuthProvider } from './feature/auth/auth.context.jsx'
import { InterviewProvider } from './feature/ai/interview.context.jsx'

const App = () => {
  return (
    <AuthProvider>
      <InterviewProvider>
      <RouterProvider router={router} />
      </InterviewProvider>

    </AuthProvider>
      
    
  )
}

export default App
