import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { SidebarLinkContext } from '../../Layout';
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionSummary from '@mui/joy/AccordionSummary';

const Fundwith = () => {
  return (
    <AccordionGroup disableDivider sx={{ maxWidth: 400 }}>
      <Accordion>
          <AccordionSummary color='white'>
              <p className="text-gray-400 font-normal hover:text-blue-500 hover:translate-x-2 duration-150 flex items-center gap-3"><GiNetworkBars /> Buy Data</p>
          </AccordionSummary>
          <AccordionDetails>
              <ul className="text-gray-400 flex flex-col gap-1 list-disc pl-10">
                  <li className='hover:text-blue-500 hover:translate-x-2 duration-150'>
                    <Link to={'data-top-up'} className=''>Fund with payment gateway (ATM)</Link>
                  </li>
                  <li className='hover:text-blue-500 hover:translate-x-2 duration-150'>
                    <Link to={'data-recharge-card'} className=''>Automated Bank Transder (#50 ch)</Link>
                  </li>
              </ul>
          </AccordionDetails>
      </Accordion>
    </AccordionGroup>
  )
}

export default function Main_links() {
    const link = useContext(SidebarLinkContext);
    return (
      <Link to={link.path} className={link.class}>{link.icon}{link.title}</Link>
    )
}
