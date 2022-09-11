
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
               {/* <td>{t('Restaurant')}</td> */}
               <td>{t('Created at')}</td>
               <td>{t('Status')}</td>
               <td>{t('Full Name')}</td>
               <td>{t('Phone Number')}</td>
               <td>{t('Email')}</td>
               <td>{t('Message')}</td>
               {/* <td>{t('Customer')}</td> */}
               {/* <td>{t('Company')}</td> */}
               {/* <td>{t('Address')}</td> */}
               {/* <td>{t('Address comments')}</td> */}
               {/* <td>{t('Estimate delivery')}</td> */}
               {/* <td>{t('Source')}</td> */}
               {/* <td>{t('Total price')}</td> */}
               {/* <td>{t('Dishes')}</td> */}
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