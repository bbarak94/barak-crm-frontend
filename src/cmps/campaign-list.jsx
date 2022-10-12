
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';

import { useEffectUpdate } from '../hooks/useEffectUpdate'

import { loadCampaigns } from "../store/actions/campaign.action.js";

import { CampaignPreview } from "./campaign-preview.jsx"

export const CampaignList = ({ setIsEditCampaign, campaigns }) => {
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
               <td>{t('Campaign Created at')}</td>
               <td>{t('Campaign')}</td>
               <td>{t('Campaign Manager')}</td>
               <td>{t('Message')}</td>
               <td>{t('Channels Count')}</td>
               <td>{t('Actions')}</td>
            </tr>
         </thead>
         <tbody >
            {campaigns.map((campaign, idx) => {
               return (
                  <tr key={idx}>
                     <CampaignPreview setIsEditCampaign={setIsEditCampaign} campaign={campaign} user={user} />
                  </tr>)
            })}
         </tbody>
      </table>
   )
}