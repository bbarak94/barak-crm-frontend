import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';

import { loadCampaigns } from '../store/actions/campaign.action'
import { userService } from '../services/user.service'

import { CampaignEdit } from '../cmps/campaign-edit'
import { ChannelEdit } from '../cmps/channel-edit'
import { CampaignList } from '../cmps/campaign-list'
import { ChannelList } from '../cmps/channel-list'

export const CampaignApp = () => {
   const navigation = useNavigate()
   const dispatch = useDispatch()
   const { t, i18n } = useTranslation();
   const [isEdit, setIsEdit] = useState(false)

   const { campaigns, campaign } = useSelector((storeState) => storeState.campaignModule)

   const user = userService.getLoggedinUser()
   useEffect(() => {
      if (!user) {
         navigation('/')
         return
      }
      dispatch(loadCampaigns(user._id))
   }, [])

   const onRefreshCampaigns = async () => {
      await dispatch(loadCampaigns(user._id))
      console.log('campaign',campaign.channels)

   }
   if (!user) return (
      <section className='campaign-app'>
         <h1 className='title'>{t('Please login to see your campaigns')}</h1>
      </section>
   )


   else return (
      <section className='campaign-app'>
         {(isEdit) && <CampaignEdit setIsEdit={setIsEdit} />}
         {(isEdit) && <ChannelEdit setIsEdit={setIsEdit} channels={campaign?.channels} />}
         <div className='flex align-center space-between' style={{ gap: '10px', marginBottom: '5px' }}>
            <div className='flex align-center'>
               <button className='add-btn' onClick={() => setIsEdit(true)}>{t('Add Campaign')}</button>
               <h1 className='title' style={{ margin: '0' }}>{t('Campaigns Count')}: {campaigns.length}</h1>
            </div>
            <button className='refresh-btn' onClick={() => { onRefreshCampaigns() }}>{t('Refresh')}</button>
         </div>
         <div className='campaign-table'>
            <CampaignList setIsEdit={setIsEdit} campaigns={campaigns} />
         </div>
         {(isEdit) && <ChannelList setIsEdit={setIsEdit} channels={campaign?.channels} />}



      </section>
   )

}