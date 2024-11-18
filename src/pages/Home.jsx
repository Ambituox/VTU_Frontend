import React from 'react'
import Header from '../components/Header'
import Hero from '../components/home_components/Hero'
import Sections1 from '../components/home_components/Sections1'

export default function Home() {
  return (
    <div className='bg-slate-200'>
      <Header/>
      <Hero/>
      <Sections1/>
    </div>
  )
}
