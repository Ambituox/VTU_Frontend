import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from '../pages/Home';

export default function App_Routes() {
  return (
    <Router future={{v7_startTransition: true,v7_relativeSplatPath: true,}}>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </Router>
  )
}
