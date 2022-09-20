import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux'

import { useEffectUpdate } from '../hooks/useEffectUpdate'

import { loadChannels } from "../store/actions/channel.action.js";

import { ChannelPreview } from "./channel-preview.jsx"
import { ChannelEdit } from "./channel-edit.jsx"


export const ChannelList = ({ channels }) => {
   const { t, i18n } = useTranslation();
   const { user } = useSelector((storeState) => storeState.userModule)
   const dispatch = useDispatch()
   const navigation = useNavigate()
   
   const [isEdit, setIsEdit] = useState(false)

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
               <button className='add-btn' onClick={() => setIsEdit(true)}>{t('Add Channel')}</button>
               <h1 className='title' style={{ margin: '0' }}>{t('Channels Count')}: {channels?.length | 0}</h1>
            </div>
            <button className='refresh-btn' onClick={() => { onRefreshChannels() }}>{t('Refresh')}</button>
         </div>
         {/* {(isEdit) && <ChannelEdit setIsEdit={setIsEdit} isEdit={isEdit}  />} */}
         {/* <div className='channel-table'>
            <ChannelList setIsEdit={setIsEdit} channels={channels} />
         </div> */
         }
         {/* {(isEdit) && <div className='channel-table'>
            <ChannelList setIsEdit={setIsEdit} channels={channels} />
         </div>
         } */}


         <table className="channel-list">
            <thead className="channel-titles">
               <tr>
                  <td>#</td>
                  <td>{t('Channel')}</td>
                  <td>{t('Channel created at')}</td>

                  <td>{t('Channel Manager')}</td>
                  <td>{t('Permissions')}</td>
                  <td>{t('Actions')}</td>
               </tr>
            </thead>
            <tbody >
               {channels?.map((channel, idx) => {
                  return (
                     <tr key={idx}>
                        <ChannelPreview channel={channel} user={user} />
                     </tr>)
               })}
            </tbody>
         </table>

      </div>
   )
}