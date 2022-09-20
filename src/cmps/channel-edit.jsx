
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { channelService } from "../services/channel.service"
import { saveChannel, loadChannels, getActionSetChannel } from "../store/actions/channel.action"
import { saveCampaign, loadCampaigns, getActionSetCampaign } from "../store/actions/campaign.action"

import { userService } from "../services/user.service"
import { ChannelPreview } from "./channel-preview"
import { ChannelList } from "./channel-list"

export const ChannelEdit = ({ channel, setIsEdit, isEdit }) => {
   const dispatch = useDispatch()
   const { t, i18n } = useTranslation();

   const { user, users } = useSelector((storeState) => storeState.userModule)
   var { campaign } = useSelector((storeState) => storeState.campaignModule)

   const [newChannel, setNewChannel] = useState()
   const [_id, set_id] = useState(channel?._id || '')
   const [channelName, setChannelName] = useState(channel?.channelName || '')
   const [channelManager, setChannelManager] = useState(channel?.channelManager || 'Admin')
   const [createdAt, setCreatedAt] = useState(channel?.createdAt || '')
   const [message, setMessage] = useState(channel?.message || '')

   useEffect(() => {
      const getEmptyChannel = async () => {
         const emptyChannel = await channelService.getEmptyChannel()
         setNewChannel(emptyChannel)
         set_id(emptyChannel._id || '')
         setChannelName(emptyChannel.channelName)
         setChannelManager(emptyChannel.channelManager)
         setCreatedAt(emptyChannel.createdAt)
      }

      (!channel) ? getEmptyChannel() : setNewChannel(channel)
   }, [])

   const handleChange = (ev, place = '') => {
      const field = ev.target?.name
      const value = ev.target?.value
      switch (field) {
         case 'channelName':
            setChannelName(value)
            break
         case 'channelManager':
            setChannelManager(value)
            break
         case 'message':
            setMessage(value)
            break
      }
   }

   const onSaveChannel = async (ev) => {
      ev.preventDefault()
      const campaignToSave = campaign
      const channelToSave = {
         channelName,
         createdAt: Date.now(),
         channelManager,
         message,
      }

      if (newChannel) channelToSave['_id'] = newChannel._id
      campaignToSave.channels.push(channelToSave)
      await dispatch((saveCampaign(campaignToSave)))
      await dispatch(loadChannels(user._id))
      await dispatch(getActionSetChannel(null))
      setIsEdit(false)
   }

   const getTime = (timeStamp) => {
      const time = new Date(timeStamp)
      let hour = time.getHours();
      hour = ('0' + hour).slice(-2);
      let minute = time.getMinutes();
      minute = ('0' + minute).slice(-2);
      const timeStr = `${hour}:${minute}:00`
      return timeStr
   }

   const getTimeStamp = (timeStr) => {
      var timeStamp = new Date(Date.now())
      timeStamp.setHours(timeStr.substring(0, 2))
      timeStamp.setMinutes(timeStr.substring(3, 5))
      timeStamp.setSeconds(timeStr.substring(6))
      return +timeStamp
   }

   if (!newChannel) return <h1>Loading...</h1>

   return (
      <div className="edit-campaign flex">

         <form className='campaign-edit-form flex' onSubmit={onSaveChannel}>
            <div className="flex column">
               <p>{t('Channel name')} </p>
               <input autoComplete='off' onChange={handleChange} autoFocus className='channel-input' value={channelName}
                  placeholder={t('Fullname')} variant='filled' type='text' name='channelName' />
            </div>

            <div className="flex column">
               <p>{t('Channel Manager')} </p>
               <select onChange={handleChange} value={channelManager} name='channelManager'>

               {users.map((user, idx) => {
               return (
                  <option key={idx} value={user.fullname}>
                  {user.fullname}
                  </option>)
            })}
               </select>
            </div>

            <div className="flex column Message">
               <p>{t('Message')} </p>
               <textarea min="2" rows="3" autoComplete='off' onChange={handleChange} className='channel-input' value={message}
                  placeholder={t('Message')} variant='filled' type='text' name='message'></textarea>
            </div>

            <button className="save" onClick={onSaveChannel}>{t('Save')}</button>
         </form>
         <button className="close-btn" onClick={async () => {
            await dispatch(getActionSetChannel(null))
            setIsEdit(false)
         }
         }
         >x</button>
         {(isEdit) && <ChannelList setIsEdit={setIsEdit} isEdit={isEdit}  />}
      </div>)
}
