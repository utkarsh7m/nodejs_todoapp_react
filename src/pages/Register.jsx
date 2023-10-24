import { Link, Navigate } from "react-router-dom";
import { Context, server } from "../main";
import { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
const [name, setname] = useState("")
const [email, setemail] = useState("")
const [password, setpassword] = useState("")
const {isAuthenticated,setisAuthenticated, loading, setloading} = useContext(Context)

  const submitHandler = async(e) => {
    setloading(true)

 try {
  e.preventDefault() //prevent loading
  const {data} = await axios.post(`${server}/users/new`,{name,email,password},{
    headers:{"Content-Type":"application/json"},
    withCredentials:true
  })
  toast.success(data.message)
  console.log(data.message);
  setisAuthenticated(true)
  setloading(false)


 } catch (error) {
  toast.error(error.response.data.message)
  setisAuthenticated(false)
  setloading(false)

 }
  }

  if(isAuthenticated) return <Navigate to={"/"}/>
  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandler}>
          <input type="text" value={name} onChange={(e)=>setname(e.target.value)} placeholder="Name" required/>
          <input type="email" value={email} onChange={(e)=>setemail(e.target.value)} placeholder="Email" required/>
          <input type="password" value={password} onChange={(e)=>setpassword(e.target.value)} required placeholder="Password"/>
          <button disabled={loading} type="submit">Sign Up</button>
          <h4>Or</h4>
          <Link to="/login">Log In</Link>
        </form>
      </section>
    </div>
  );
}

export default Register