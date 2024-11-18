import React from 'react'
import Nav from './home_components/Nav'
import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Link } from 'react-router-dom'
import { RiMenu4Line } from 'react-icons/ri'
import { FaRegWindowClose } from 'react-icons/fa'
// import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Home', path: '#' },
  { name: 'About', path: '#' },
  { name: 'Services', path: '#' },
  { name: 'Contact', path: '#' },
  { name: 'Create Account', path: '#' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className=" inset-x-0 top-0 z-50 sticky header">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex">
            <Link to="/" className="">
              <span className="font-medium text-2xl">Logo</span>
            </Link>
          </div>
          
          <div className="hidden lg:flex lg:gap-x-12">
            {
            navigation.map((item) => (
              <Link key={item.name} to={item.path} className="text-[12px] font-semibold text-gray-900">
                {item.name}
              </Link>
            ))}
          </div>
          <div className="flex gap-6">
            
            <div className="lg:flex lg:flex-1 lg:justify-end">
              <Link href="#" className="bg-orange-600 text-white px-4 py-2 rounded-md font-semibold ">
                Log in <span>&rarr;</span>
              </Link>
            </div>

            <div className="flex lg:hidden">
              <button type="button" onClick={() => setMobileMenuOpen(true)} className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
                <RiMenu4Line className='text-2xl'/>
              </button>
            </div>

          </div>
        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link to="/" className="">
                <span className="font-medium text-2xl">Logo</span>
              </Link>
              <button type="button" onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700">
                <span className="sr-only">Close menu</span>
                <FaRegWindowClose aria-hidden="true" className="text-3xl" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-orange-50 duration-200"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  <Link to="#" className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                    Log in
                  </Link>
                  <Link to="#" className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                    Register
                  </Link>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
  )
}
