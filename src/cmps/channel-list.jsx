import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux'

import { useEffectUpdate } from '../hooks/useEffectUpdate'

import { loadChannels } from "../store/actions/channel.action.js";

import { ChannelPreview } from "./channel-preview.jsx"


export const ChannelList = ({ campaign, isEditCampaign, setIsEditCampaign, isEditChannel, setIsEditChannel, channels }) => {
   const { t, i18n } = useTranslation();
   const { user } = useSelector((storeState) => storeState.userModule)
   const dispatch = useDispatch()
   const navigation = useNavigate()


   useEffect(() => {
      if (!user) {
         navigation('/')
         return
      }
      dispatch(loadChannels(user._id))
   }, [])

   const onRefreshChannels = async () => {
      await dispatch(loadChannels(user._id))
   }



   return (

      <div>

         <div className='flex align-center space-between' style={{ gap: '10px', marginBottom: '5px' }}>
            <div className='flex align-center'>
               <button className='add-btn' onClick={() => setIsEditChannel(true)}>{t('Add Channel')}</button>
               <h1 className='title' style={{ margin: '0' }}>{campaign?.campaignName} - </h1>
               <h1 className='title' style={{ margin: '0' }}>{t('Channels Count')}: {channels?.length | 0}</h1>
            </div>
            <button className='refresh-btn' onClick={() => { onRefreshChannels() }}>{t('Refresh')}</button>
         </div>


         {/* {(isEditCampaign) && <ChannelEdit setIsEditCampaign={setIsEditCampaign} isEditCampaign={isEditCampaign}  />}
         <div className='channel-table'>
            <ChannelList setIsEditCampaign={setIsEditCampaign} channels={channels} />
         </div>  */}

         {/* {(isEditCampaign) && <div className='channel-table'>
            <ChannelList setIsEditCampaign={setIsEditCampaign} channels={channels} />
         </div>
         }  */}


         <table className="channel-list">
            <thead className="channel-titles">
               <tr>
                  <td>#</td>
                  <td>{t('Channel')}</td>
                  <td>{t('Channel created at')}</td>
                  <td>{t('Channel type')}</td>
                  {/* <td>{t('Permissions')}</td> */}
                  <td>{t('Actions')}</td>
               </tr>
            </thead>
            <tbody >
               {channels?.map((channel, idx) => {
                  return (
                     <tr key={idx}>
                        <ChannelPreview setIsEditChannel={setIsEditChannel} channel={channel} user={user} />
                     </tr>)
               })}
            </tbody>
         </table>

      </div>
   )
}