import React, { useState } from 'react' 
import { Link } from 'react-router-dom'
import { Dialog, DialogPanel } from '@headlessui/react'
import { RiMenu4Line } from 'react-icons/ri'
import { FaRegWindowClose } from 'react-icons/fa'

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
    <header className="shadow-md sticky top-0 z-50 bg-white">
      <nav aria-label="Global" className="flex items-center justify-between p-6 max-w-screen-xl mx-auto">
        <div className="flex">
          <Link
            to="/"
            className="font-extrabold text-3xl text-gray-900 transition duration-300 ease-in-out transform hover:scale-110"
          >
            Ambitioux
          </Link>
        </div>

        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="text-lg font-semibold text-gray-900 hov transition duration-300 ease-in-out transform hover:scale-105"
            >
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

          <div className="lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="inline-flex items-center justify-center p-2.5 text-gray-700 rounded-md focus:outline-none transition transform hover:scale-105"
            >
              <RiMenu4Line className="text-2xl" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dialog */}
      <Dialog open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 transition-transform transform duration-300 ease-in-out translate-x-full sm:translate-x-0">
          <div className="flex items-center justify-between">
            <Link to="/" className="font-extrabold text-2xl text-gray-900">
              Ambitioux
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-700"
            >
              <FaRegWindowClose className="text-3xl" />
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="block px-3 py-2 text-base font-semibold text-gray-900 hover:bg-orange-50 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
              >
                {item.name}
              </Link>
            ))}

            <div className="mt-6 space-y-4">
              <Link
                to="/login"
                className="block px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="block px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
              >
                Register
              </Link>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
