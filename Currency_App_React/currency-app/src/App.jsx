import { useState } from 'react'
import './App.css'
import Currency from './Components/Currency'


function App() {


  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column', marginTop:50}}>
      <Currency></Currency>
    </div>
  )
}

export default App
