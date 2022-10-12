
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';


import { useEffectUpdate } from '../hooks/useEffectUpdate'


import { loadStatuses } from "../store/actions/status.action.js";

import { StatusPreview } from "./status-preview.jsx"


export const StatusList = ({ setIsEdit, statuses }) => {
   const { t, i18n } = useTranslation();
   const { user, users } = useSelector((storeState) => storeState.userModule)
   // const { statuses } = useSelector((storeState) => storeState.statusesModule)
   
   useEffectUpdate(() => {
      loadStatuses(user._id)
   }, [statuses])


   return (
      <div className='lead-list flex'>
      <table className="lead-list-table">
         <thead className="lead-titles">
            <tr>
               <td>#</td>
               <td>{t('Status Name')}</td>
               <td>{t('Status Type')}</td>
               <td>{t('Color')}</td>
               <td>{t('Background Color')}</td>
               <td>{t('Actions')}</td>

            </tr>
         </thead>
         <tbody >
            {statuses.reverse().map((status, idx) => {
               return (
                  <tr key={idx}>
                     <StatusPreview setIsEdit={setIsEdit} status={status} user={user} />
                  </tr>)
            })}
         </tbody>

      </table>
      </div>

   
   )
   
}