
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';

import { loadCampaigns } from '../store/actions/campaign.action'

import { useEffectUpdate } from '../hooks/useEffectUpdate'


import { loadLeads } from "../store/actions/lead.action.js";

import { LeadPreview } from "./lead-preview"
import { LeadFilter } from '../cmps/lead-filter'
import { useEffect, useState } from "react";


export const LeadList = ({ setIsEdit, leads, filterBy }) => {
   
   const { t, i18n } = useTranslation();
   const { user, users } = useSelector((storeState) => storeState.userModule)
   const { campaigns } = useSelector((storeState) => storeState.campaignModule)
   const { statuses } = useSelector((storeState) => storeState.statusModule)
   // const filterBy = useSelector((storeState) => storeState.leadModule.filterBy)
   const [leadsToShow,setLeadsToShow] = useState(leads)


   useEffectUpdate(() => {
      loadLeads(user._id)
      filterLeads()
   }, [leads, filterBy])

   useEffect(() => {
      filterLeads()
   }, [filterBy])


   const filterLeads = () => {
      loadLeads(user._id)
      let filteredLeads = leads
      if (filterBy.date) {
      }
      if (filterBy.text) {
      }
      if (filterBy.status.length) {
         filteredLeads = filteredLeads.filter((lead,idx) => {
            if (filterBy.status.includes(t(lead.status))) return lead
         })
      }
      if (filterBy.campaign) {

      }
      if (filterBy.creator.length) {
         filteredLeads = filteredLeads.filter((lead,idx) => {
            if (filterBy.creator.includes(lead.creator)) return lead
         })
      }
       setLeadsToShow(filteredLeads)

   }
   return (
      <div className='lead-list flex'>
         {/* <LeadFilter leads={leads} user={user} users={users} campaigns={campaigns} statuses={statuses} /> */}
         <table className="lead-list-table">
            <thead className="lead-titles">
               <tr>
                  <td>#</td>
                  <td>{t('Creator')}</td>
                  <td>{t('Created at')}</td>
                  <td>{t('Status')}</td>
                  <td>{t('Campaign')}</td>
                  <td>{t('Channel')}</td>
                  <td>{t('Business Name')}</td>
                  <td>{t('Manager Name')}</td>
                  <td>{t('Phone Number')}</td>
                  <td>{t('Phone Number2')}</td>
                  <td>{t('Phone Number3')}</td>
                  <td>{t('Class Desc')}</td>
                  <td>{t('Role')}</td>
                  <td>{t('Email')}</td>
                  <td>{t('Address')}</td>
                  <td>{t('Address2')}</td>
                  <td>{t('Message')}</td>
                  <td>{t('Actions')}</td>
               </tr>
            </thead>
            <tbody >
               {leadsToShow.map((lead, idx) => {
                  return (
                     <tr key={idx}>
                        <LeadPreview setIsEdit={setIsEdit} lead={lead} user={user} />
                     </tr>)
               })}
            </tbody>

         </table>
      </div>


   )

}