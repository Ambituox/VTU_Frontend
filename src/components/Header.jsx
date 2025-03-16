import React, { useState } from 'react' 
import { Link } from 'react-router-dom'
import { Dialog, DialogPanel } from '@headlessui/react'
import { RiMenu4Line } from 'react-icons/ri'
import { FaRegWindowClose } from 'react-icons/fa'
import Sidebar from './Sidebar'

const navigation = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Contact', path: '/contact' },
  { name: 'Create Account', path: '/signup' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="shadow-sm sticky top-0 z-50 bg-white">
      <nav aria-label="Global" className="flex items-center justify-between p-4 max-w-screen-xl mx-auto">
        <div className="flex">
          <Link to="/" className="font-extrabold text-3xl text-gray-900 transition duration-300 ease-in-out transform hover:scale-110"> 
            Ambitioux
          </Link>
        </div>

        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link key={item.name} to={item.path} className="text-lg font-semibold text-gray-900 hov transition duration-300 ease-in-out transform hover:scale-105">
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex gap-6 items-center">
          <div className="hidden lg:flex">
            <Link to="/login"
              className="text-white cl2 px-4 py-2 rounded-md font-semibold transition duration-300 ease-in-out transform hover:scale-105">
              Log In
            </Link>
          </div>

          <div className="lg:hidden block">
            <Sidebar/>
          </div>
        </div>
      </nav>
    </header>
  )
}
