import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from '../pages/Home';
import Footer from '../components/Footer';
import Services_page from '../pages/Services_page';
import About_page from '../pages/About_page';
import AboutUs from '../pages/about';
import ContactPage from '../pages/Contact_page';
import CreateAccountPage from '../pages/auth/Sign_up';
import SignIn from '../pages/auth/Sign_in';

export default function App_Routes() {
  return (
    <Router future={{v7_startTransition: true,v7_relativeSplatPath: true,}}>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About_page/>}/>
        <Route path='/aboutus' element={<AboutUs/>}/>
        <Route path='/services' element={<Services_page/>}/>
        <Route path='/contact' element={<ContactPage/>}/>
        <Route path='/signup' element={<CreateAccountPage/>}/>
        <Route path='/login' element={<SignIn/>}/>
      </Routes>
      <Footer/>
    </Router>
  )
}
