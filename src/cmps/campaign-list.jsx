
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';

import { useEffectUpdate } from '../hooks/useEffectUpdate'

import { loadCampaigns } from "../store/actions/campaign.action.js";

import { CampaignPreview } from "./campaign-preview.jsx"

export const CampaignList = ({ setIsEdit, campaigns }) => {
   const { t, i18n } = useTranslation();
   const { user } = useSelector((storeState) => storeState.userModule)

   useEffectUpdate(() => {
      loadCampaigns(user._id)
   }, [campaigns])
   return (
      <table className="campaign-list">
         <thead className="campaign-titles">
            <tr>
               <td>#</td>
               {/* <td>{t('Restaurant')}</td> */}
               <td>{t('Campaign Created at')}</td>
               {/* <td>{t('Status')}</td> */}
               <td>{t('Campaign')}</td>
               <td>{t('Campaign Manager')}</td>
               {/* <td>{t('Phone Number')}</td> */}
               {/* <td>{t('Email')}</td> */}
               {/* <td>{t('Message')}</td> */}
               {/* <td>{t('Customer')}</td> */}
               {/* <td>{t('Company')}</td> */}
               {/* <td>{t('Address')}</td> */}
               {/* <td>{t('Address comments')}</td> */}
               {/* <td>{t('Estimate delivery')}</td> */}
               {/* <td>{t('Source')}</td> */}
               {/* <td>{t('Total price')}</td> */}
               {/* <td>{t('Dishes')}</td> */}
               <td>{t('Message')}</td>
               <td>{t('Channels Count')}</td>
               <td>{t('Actions')}</td>
            </tr>
         </thead>
         <tbody >
            {campaigns.map((campaign, idx) => {
               return (
                  <tr key={idx}>
                     <CampaignPreview setIsEdit={setIsEdit} campaign={campaign} user={user} />
                  </tr>)
            })}
         </tbody>
      </table>
   )
}