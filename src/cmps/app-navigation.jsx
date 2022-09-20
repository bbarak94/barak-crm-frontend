import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next'

import i18next from 'i18next'


import { userService } from '../services/user.service.js'
import routes from '../routes'

import logo from '../assets/img/logo.png'

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DeliveryDiningOutlinedIcon from '@mui/icons-material/DeliveryDiningOutlined';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import GpsFixedOutlinedIcon from '@mui/icons-material/GpsFixedOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import VpnKeyTwoToneIcon from '@mui/icons-material/VpnKeyTwoTone';
import FaceTwoToneIcon from '@mui/icons-material/FaceTwoTone';
import LogoutIcon from '@mui/icons-material/Logout';

export const AppNavigation = () => {
   const navigation = useNavigate()
   const { t, i18n } = useTranslation();
   const [lang, setLang] = useState('he')

   const { leads } = useSelector((storeState) => storeState.leadModule)
   const user = userService.getLoggedinUser()

   useEffect(() => {
      i18next.changeLanguage('he')
      document.body.dir = 'RTL'

   }, [])
   

   const onLogout = () => {
      userService.logout()
      navigation('/')
      window.location.reload()
   }

   const handelLangChange = (ev) => {
      const selectedLang = ev.target.value
      i18next.changeLanguage(selectedLang)
      setLang(selectedLang)
      if (selectedLang === 'he') document.body.dir = 'RTL'
      else document.body.dir = 'LTR'
   }

   return (
      <div className="app-navigation">
         <aside>
            {/* <UserMsg /> */}
            <div className='sidebar'>
               <nav>
                  <div className='top flex align-center space-between'>
                     <div className='logo flex img-container'>
                        <img src={logo} />
                     </div>
                  </div>
                  {routes.map(route => <NavLink className='nav-link' key={route.path} to={route.path}>
                     <h3>
                        {(route.label === 'Home') && <span><HomeOutlinedIcon /></span>}
                        {(route.label === 'Leads') && <span><DeliveryDiningOutlinedIcon /></span>}
                        {/* {(route.label === 'Printers') && <span><LocalPrintshopOutlinedIcon /></span>} */}
                        {/* {(route.label === 'Zones') && <span><GpsFixedOutlinedIcon /></span>} */}
                        {(route.label === 'Campaigns') && <span><GpsFixedOutlinedIcon /></span>}
                        {(route.label === 'Settings') && <span><SettingsOutlinedIcon /></span>}
                        {(route.label === 'Login') && <span><VpnKeyTwoToneIcon /></span>}
                        {(route.label === 'Signup') && <span><FaceTwoToneIcon /></span>}
                        {t(route.label)}
                        {(route.label === 'Leads') && <span className='lead-count'>{leads.length || 984}</span>}
                     </h3>
                  </NavLink>)}
                  <div className='lang-container flex justify-center'>
                     <select onChange={handelLangChange} className="lang-option" value={lang}>
                        <option value="he">{t('langHe')}</option>
                        <option value="en">{t('langEn')}</option>
                     </select>
                  </div>
               </nav>
               {user && (
                  <h3 onClick={() => onLogout()} className='logout-btn'>
                     <LogoutIcon />
                     {t('Logout')}
                  </h3>
               )}
            </div>
         </aside >
      </div >
   )
}
