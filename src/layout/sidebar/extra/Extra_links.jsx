import React from 'react'
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionSummary from '@mui/joy/AccordionSummary';
import { Link } from 'react-router-dom';
import { FaCode, FaMoneyBill, FaUser } from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';
import { TbLogout } from 'react-icons/tb';

export default function Extra_links() {
  return (
    <div className="text-gray-400 mt-5">
        <p className="text-[13px] pl-3 text-blue-500 font-normal">EXTRA</p>
        <div className="pl-3 pt-2 font-">
            <Link to={'pricing'} className='hover:text-black duration-150 flex items-center gap-3'><FaMoneyBill /> Pricing</Link>
        </div>
        <div className="pl-3 pt-2 font-">
            <Link to={'user-detail'} className='hover:text-black duration-150 flex items-center gap-3'><FaUser /> Account</Link>
        </div>
        <div className="pl-3 pt-2 font-">
            <Link to={'/'} className='hover:text-black duration-150 flex items-center gap-3'><IoMdSettings /> Change Pin</Link>
        </div>
        {/* <div className="pl-3 pt-2 font-">
            <Link to={'/'} className='hover:text-black duration-150'>Setting</Link>
        </div> */}
        <div className="pl-3 pt-2 font-">
            <Link to={'documentation'} className='hover:text-black duration-150 flex items-center gap-3'><FaCode />Developer's API</Link>
        </div>
        <button className='pl-3 pt-2 flex items-center gap-3'><TbLogout /> Logout</button>
    </div>
  )
}
