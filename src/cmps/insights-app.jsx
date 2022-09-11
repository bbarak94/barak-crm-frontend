

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import RestaurantIcon from '@mui/icons-material/Restaurant';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export const InsightsApp = () => {
   const { t, i18n } = useTranslation()
   const [totalSales, setTotalSales] = useState(25534)
   const [totalLeads, setTotalLeads] = useState(984)
   const [totalClients, setTotalClients] = useState(65)

   const { users } = useSelector((storeState) => storeState.userModule)
   const { user } = useSelector((storeState) => storeState.userModule)
   const { leads } = useSelector((storeState) => storeState.leadModule)

   useEffect(() => {
      if (user) {
         setTotalLeads(leads.length)
         var sum = leads.reduce((acc, lead) => {
            return (+lead.totalPrice) + acc
         }, 0)
         setTotalSales(sum)
         setTotalLeads(leads.length)
      }
      if (users.length) {
         setTotalClients(users.length)
      }

      if (leads.length) {
         setTotalLeads(leads.length)
         setTotalClients(leads.length)
      }
   }, [])

   useEffect(() => {
      if (user) {
         setTotalLeads(leads.length)
         var sum = leads.reduce((acc, lead) => {
            return (+lead.totalPrice) + acc
         }, 0)
         setTotalSales(sum)
         setTotalLeads(leads.length)
      }
      if (users.length) {
         setTotalClients(users.length)
      }

      if (leads.length) {
         setTotalLeads(leads.length)
         setTotalClients(leads.length)
      }
   }, [leads])

   return (
      <div className='insights'>
         <div className='card'>
            <div className='middle'>
               <div className='left'>
                  <h3>{t('Total Sales')}</h3>
                  <h1>{(document.body.dir === 'rtl') ?
                     totalSales.toLocaleString('il-HE', { style: 'currency', currency: 'ILS' })
                     :
                     totalSales.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
                  }
                  </h1>
                  <h4>{t('Last 24 Hours')}</h4>
               </div>
            </div>
            <div className='icon-container flex align-center justify-center'>
               <AttachMoneyIcon style={{ width: '36px', height: '36px' }} />
            </div>
         </div>
         <div className='card'>
            <div className='middle'>
               <div className='left'>
                  <h3>{t('Total Leads')}</h3>
                  <h1>{totalLeads}</h1>
                  <h4>{t('Last 24 Hours')}</h4>
               </div>
            </div>
            <div className='icon-container flex align-center justify-center leads'>
               <ReceiptLongIcon style={{ width: '36px', height: '36px' }} />
            </div>
         </div>
         <div className='card'>
            <div className='middle'>
               <div className='left'>
                  <h3>{t('Total Clients')}</h3>
                  <h1>{totalClients}</h1>
                  <h4>{t('Last 24 Hours')}</h4>
               </div>
            </div>
            <div className='icon-container flex align-center justify-center restaurants'>
               <RestaurantIcon style={{ width: '36px', height: '36px' }} />
            </div>
         </div >
      </div >
   )
}