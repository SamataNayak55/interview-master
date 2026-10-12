import '../pages/auth.form.scss'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const Protected = ({children}) => {
    const navigate = useNavigate()
    const {loading, user} = useAuth();

     if(loading){
      return ( 
        <main> <h1>Loading................</h1></main>
      )
    }

    if(!user){
      return (
        <main>
          <div id="login-popup-backdrop">
            <div id="login-popup" role="alertdialog" aria-modal="true" aria-labelledby="protected-popup-message">
              <p id="protected-popup-message">Please log in to continue.</p>
              <button id="login-popup-button" type="button" onClick={() => navigate('/login')}>
                Try again
              </button>
            </div>
          </div>
        </main>
      )
    }

  return children
}

export default Protected
