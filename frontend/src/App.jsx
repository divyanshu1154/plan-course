import { useState } from 'react'
import {BrowserRouter as Router, Routes , Route} from 'react-router-dom';
import './App.css'
import Layout from './pages/Layout';
import Admin from './pages/Admin'
import Course from './pages/Course';
import Home from './pages/Home';
import User from './pages/User';
import Profile from './pages/Profile';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route element={<Layout/>} >
          <Route path='/' element={<Home/>} />
          <Route path='/admin' element={<Admin/>} />
          <Route path='/course/:id' element={<Course/>} />
          <Route path='signin' element={<User/>} />
          <Route path='/profile' element={<Profile/>} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
