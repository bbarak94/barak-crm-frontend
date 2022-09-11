import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { userService } from '../services/user.service'
import { printerService } from '../services/printer.service.js'

import { PrinterList } from '../cmps/printer-list'

export const PrinterApp = () => {
   const navigation = useNavigate()
   const { t, i18n } = useTranslation();

   const user = userService.getLoggedinUser()

   const [printers, setprinters] = useState([])
   const [activeCount, setActiveCount] = useState(0)

   useEffect(() => {
      if (!user) {
         navigation('/')
         return
      }
      getActiveCount()
      printerService.query(user.API_KEY)
         .then(printers => {
            if (!printers) {
               setprinters(null)
               return
            } else {
               setprinters(printers)
            }
         })
   }, [])


   const onRefreshPrinters = async () => {
      printerService.query(user.API_KEY)
         .then(printers => {
            if (!printers) {
               setprinters(null)
               return
            } else {
               setprinters(printers)
            }
         })
      getActiveCount()
   }

   const getActiveCount = async () => {
      const selectedPrinters = user.activePrinters.filter(p => (p.isSelected))
      setActiveCount(selectedPrinters.length)
   }

   if (!user) return <section className='printer-app'>
      <h1 className='title'>{t('Please login to see your printers')}</h1>
   </section>

   else if (!user.API_KEY) return <h1>{t('Please check your API key')}</h1>

   else if (!printers) return <h1>{user.fullname} {t('have no printers yet, please check your API KEY')}</h1>

   else return (
      <section className='printer-app'>
         <div className='printer-status flex column'>
            <button onClick={() => { onRefreshPrinters() }}>{t('Refresh')}</button>
            <h1 style={{ margin: 'auto 0' }}>{t('Total printers')}: {printers.length}</h1>
            <h1 style={{ margin: 'auto 0' }}>{t('Selected printers')}: {activeCount}</h1>
         </div>
         {(printers.length) && <PrinterList onRefreshPrinters={onRefreshPrinters} printers={printers} user={user} />}
      </section>
   )
}