import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Profile from "./pages/profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { Context, server } from "./main";
import { useContext, useEffect } from "react";
function App() {
const {setUser,setisAuthenticated,setloading} = useContext(Context)

useEffect(() => {
  setloading(true)
axios.get(`${server}/users/me`,{
  withCredentials:true
}).then((res) => {
  setUser(res.data.user)
  setisAuthenticated(true)
  setloading(false)
}).catch(() => {
  setUser({})
  setisAuthenticated(false)
  setloading(false)

})
}, [])

  return <Router>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
    </Routes>
    <Toaster/>
  </Router>
}

export default App
