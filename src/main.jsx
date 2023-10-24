import React, { createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/app.scss'
export const server = "https://nodejs-todoapp-p02i.onrender.com/api/v1"

export const Context = createContext({isAuthenticated:false})
const Appwrapper = () => {
  const [isAuthenticated, setisAuthenticated] = useState(false)
  const [loading, setloading] = useState(false)
  const [user, setUser] = useState({})
  return(
    <Context.Provider value={{
      isAuthenticated,
      setisAuthenticated,
      loading,
      setloading,
      user,
      setUser
      }}>
      <App />
    </Context.Provider>
  )
}
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Appwrapper/>
    {/* <App /> */}
  </React.StrictMode>,
)
