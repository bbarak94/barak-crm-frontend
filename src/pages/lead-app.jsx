import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';

import { loadLeads } from '../store/actions/lead.action'
import { userService } from '../services/user.service'

import { InsightsApp } from '../cmps/insights-app'
import { LeadEdit } from '../cmps/lead-edit'
import { LeadList } from '../cmps/lead-list'

export const LeadApp = () => {
   const navigation = useNavigate()
   const dispatch = useDispatch()
   const { t, i18n } = useTranslation();

   const [isEdit, setIsEdit] = useState(false)

   const { leads } = useSelector((storeState) => storeState.leadModule)
   const user = userService.getLoggedinUser()

   useEffect(() => {
      if (!user) {
         navigation('/')
         return
      }
      dispatch(loadLeads(user._id))
   }, [])

   const onRefreshLeads = async () => {
      await dispatch(loadLeads(user._id))
   }
   if (!user) return (
      <section className='lead-app'>
         <h1 className='title'>{t('Please login to see your leads')}</h1>
      </section>
   )

   // else if (!leads?.length) return (
   //    <section className='lead-app'>
   //       <h1>{t('No leads')}</h1>
   //       <button onClick={() => setIsEdit(true)}>{t('Add an lead')}</button>
   //       {(isEdit) && <LeadEdit setIsEdit={setIsEdit} />}
   //    </section>
   // )

   else return (
      <section className='lead-app'>
         {/* <InsightsApp totalLeads={leads.length} totalClients={leads.length} totalSales={leads.length} /> */}
         <div className='flex align-center space-between' style={{ gap: '10px', marginBottom: '5px' }}>
            <div className='flex align-center'>
               <button className='add-btn' onClick={() => setIsEdit(true)}>{t('Add Lead')}</button>
               <h1 className='title' style={{ margin: '0' }}>{t('Leads Count')}: {leads.length}</h1>
            </div>
            <button className='refresh-btn' onClick={() => { onRefreshLeads() }}>{t('Refresh')}</button>
         </div>
         {(isEdit) && <LeadEdit setIsEdit={setIsEdit} />}
         <div className='lead-table'>
            <LeadList setIsEdit={setIsEdit} leads={leads} />
         </div>
      </section>
   )

}