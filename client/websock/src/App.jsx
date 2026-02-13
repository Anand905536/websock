import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './components/login/Login';
import Register from './components/register/Register'
import Profile from './components/profile/Profile';
import Chat from './components/chat/Chat';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/start-chat" element={<Chat/>}/>
    </Routes>
  )
}

export default App
