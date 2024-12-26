import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Link, Route, Routes, useParams, NavLink } from "react-router";


const Home = () => {

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((data) => data.json())
      .then((data) => setPosts(data))
  }, [])

  return (<>
    <div>
      home page

    </div>
    <a href="/settings">Setting</a>
    <a href="/settings/profile">Profile</a>
    <a href="/post">Posts</a>
    <a href="/about">About</a>

    <div className='posts-container'>
      {posts.map((post) => <NavLink to={`/post/${post.id}`} className='posts-item'>{post.title}</NavLink>)}
    </div>
  </>
  )
}
const Setting = () => {
  return (<>
    <div>
      Setting page
    </div>
    <a href="/settings/login">Login</a>


  </>
  )
}
const Profile = () => {
  return (
    <div>
      Profile page
    </div>
  )
}
const Post = () => {
  const params = useParams();
  console.log("params", params)
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`)
      .then((data) => data.json())
      .then((data) => setData(data))
  }, [])

  console.log(data)

  if (data === null) return (<p>Loading.....</p>)


  return (
    <div>
      <h3>{data.title}</h3>
      <p>{data.body}</p>
    </div>
  )
}
const About = () => {
  return (
    <div>
      About page
    </div>
  )
}
const SignInLogIn = () => {
  return (<>
    <div>
      <button>Log in</button>
      <button>Sign in</button>
    </div>
  </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/settings' element={<Setting />} />

        <Route path='settings' >
          <Route path='profile' element={<Profile />} />
          <Route path='login' element={<SignInLogIn />} />
        </Route>
        <Route path='/post/:postId' element={<Post />} />
      </Routes>
      {/* <App /> */}
    </BrowserRouter>
  </StrictMode>,
)
