import React from 'react'
import Home from './routes/Home'
import logo from './assets/images/musico.svg'
import './App.scss'

function App() {
  return (
    <div className="App">
      <header>
        <img src={logo} alt={'logo'}/>
      </header>
      <Home/>
    </div>
  )
}

export default App
