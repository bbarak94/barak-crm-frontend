
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';

import { useEffectUpdate } from '../hooks/useEffectUpdate'

import { loadLeads } from "../store/actions/lead.action.js";

import { LeadPreview } from "./lead-preview"


export const LeadList = ({ setIsEdit, leads }) => {
   const { t, i18n } = useTranslation();
   const { user } = useSelector((storeState) => storeState.userModule)

   useEffectUpdate(() => {
      loadLeads(user._id)
   }, [leads])


   return (

      <table className="lead-list">
         <thead className="lead-titles">
            <tr>
               <td>#</td>
               <td>{t('Creator')}</td>
               <td>{t('Created at')}</td>
               <td>{t('Status')}</td>
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
            {leads.map((lead, idx) => {
               return (
                  <tr key={idx}>
                     <LeadPreview setIsEdit={setIsEdit} lead={lead} user={user} />
                  </tr>)
            })}
         </tbody>
      </table>

   )
}