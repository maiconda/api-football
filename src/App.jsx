import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Countries from './pages/countries/countries'
import Leagues from './pages/leagues/leagues'
import Login from './pages/login/login'
import Navbar from './components/navbar/navbar'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { UserProvider } from './UserContext';

function App() {

  return (
    <div className="App">
    <BrowserRouter>
    <UserProvider>
      <Navbar/>
      <main>
      <Routes>
        <Route path='/' element={<Countries/>}/>
        <Route path='/countries' element={<Countries/>}/>
        <Route path='/leagues/:id' element={<Leagues/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
      </main>
    </UserProvider>
    </BrowserRouter>
    </div>
  )
}

export default App
