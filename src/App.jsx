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
import Teams from './pages/teams/teams'
import Team from './pages/team/team'

function App() {

  const closeSeasons = () => {
    document.querySelector('.seasons-div').style.opacity = '0'
    document.querySelector('.container').style.opacity = '0'
    setTimeout(() => {
        document.querySelector('.seasons-div').style.zIndex = '-1'
        document.querySelector('.container').style.zIndex = '-1'
    }, 0);
  }

  return (
    <div className="App">
    <div onClick={closeSeasons} className="container"></div>
    <BrowserRouter>
    <UserProvider>
      <Navbar/>
      <main>
      <Routes>
        <Route path='/' element={<Countries/>}/>
        <Route path='*' element={<Countries/>}/>
        <Route path='/countries' element={<Countries/>}/>
        <Route path='/leagues/:id' element={<Leagues/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/teams/:leagueId/:season' element={<Teams/>}/>
        <Route path='/team/:leagueId/:season/:teamId' element={<Team/>}/>
      </Routes>
      </main>
    </UserProvider>
    </BrowserRouter>
    </div>
  )
}

export default App
