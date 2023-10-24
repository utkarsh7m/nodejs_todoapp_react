import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Context, server } from "../main"
import toast from "react-hot-toast"
import TodoItems from "../components/todoItems";
import { Navigate } from "react-router-dom";

const Home = () => {
  const [title, settitle] = useState("")
  const [description, setdescription] = useState("")
  const [loading, setloading] = useState(false)
  const [tasks, settasks] = useState([])
  const [refresh, setRefresh] = useState(false);
  const { isAuthenticated } = useContext(Context)


  const updateHandler = async (id) => {
    try {
      const { data } = await axios.put(
        `${server}/task/${id}`,
        {},
        {
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
    // toast.success(id)
  };
  const deleteHandler = async(id) => {
    try {
      const { data } = await axios.delete(
        `${server}/task/${id}`,
         {
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  //   try {
  //     const { data } = await axios.delete(`${server}/task/${id}`, {
  //       withCredentials: true,
  //     });

  //     toast.success(data.message);
  //     setRefresh((prev) => !prev);
  //   } catch (error) {
  //     toast.error(error.response.data.message);
  //   }
  // };
    // toast.error(id)
  }

  const submitHandler = (async (e) => {
    e.preventDefault()
    setloading(true)
    try {
      const { data } = await axios.post(`${server}/task/new`, { title, description },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        })
        settitle("")
        setdescription("")
      toast.success(data.message)
      setloading(false)

    } catch (error) {
      toast.error(error.response.data.message)
      setloading(false)


    }
    
  })
  useEffect(() => {
    axios.get(`${server}/task/my`,{
      withCredentials:true
    }).then((res) => {
      // console.log(res.data.tasks);
      settasks(res.data.tasks)
    }).catch((e) => {
      toast.error(e.response.data.message)
    })
  }, [refresh])
  if (!isAuthenticated) return <Navigate to={"/login"} />

  return (
    <div className="container">
      <div className="login">
        <section>
          <form onSubmit={submitHandler}>
            <input type="text" value={title} onChange={(e) => settitle(e.target.value)} placeholder="Title" required />
            <input type="text" value={description} onChange={(e) => setdescription(e.target.value)} placeholder="Description" required />
            <button type="submit" disabled={loading}>Add Task</button>

          </form>
        </section>
      </div>
      <section className="todosContainer">
      {tasks.map((i) => (
          <TodoItems
            title={i.title}
            description={i.description}
            isCompleted={i.isCompleted}
            updateHandler={updateHandler}
            deleteHandler={deleteHandler}
            id={i._id}
            key={i._id}
          />
        ))}
      </section>
    </div>
  )
}
export default Home