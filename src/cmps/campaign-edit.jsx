import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { campaignService } from "../services/campaign.service"
import { saveCampaign, loadCampaigns, getActionSetCampaign } from "../store/actions/campaign.action"


export const CampaignEdit = ({ setIsEditCampaign }) => {
   const dispatch = useDispatch()
   const { t, i18n } = useTranslation();

   const { user, users } = useSelector((storeState) => storeState.userModule)
   var { campaign } = useSelector((storeState) => storeState.campaignModule)

   const [newCampaign, setNewCampaign] = useState()
   const [_id, set_id] = useState(campaign?._id || '')
   const [campaignName, setCampaignName] = useState(campaign?.campaignName || '')
   const [campaignManager, setCampaignManager] = useState(campaign?.campaignManager || user.fullname)
   const [createdAt, setCreatedAt] = useState(campaign?.createdAt || '')
   const [message, setMessage] = useState(campaign?.message || '')
   const [channels, setChannels] = useState(campaign?.channels || [])

   useEffect(() => {
      const getEmptyCampaign = async () => {
         const emptyCampaign = await campaignService.getEmptyCampaign()
         setNewCampaign(emptyCampaign)
         set_id(emptyCampaign._id || '')
         setCampaignName(emptyCampaign.campaignName)
         setCampaignManager(user.fullname)
         setMessage(emptyCampaign.campignManager)
         setCreatedAt(emptyCampaign.createdAt)
      }

      (!campaign) ? getEmptyCampaign() : setNewCampaign(campaign)
   }, [])

   const handleChange = (ev, place = '') => {
      const field = ev.target?.name
      const value = ev.target?.value
      switch (field) {
         case 'campaignName':
            setCampaignName(value)
            break
         case 'campaignManager':
            setCampaignManager(value)
            break
         case 'message':
            setMessage(value)
            break
      }
   }

   const onSaveCampaign = async (ev) => {
      ev.preventDefault()
      const campaignToSave = {
         campaignName,
         createdAt: Date.now(),
         campaignManager,
         message,
         channels: campaign?.channels ? campaign.channels : []
      }

      if (newCampaign) campaignToSave['_id'] = newCampaign._id
      await dispatch((saveCampaign(campaignToSave)))
      await dispatch(loadCampaigns(user._id))
      await dispatch(getActionSetCampaign(null))
      setIsEditCampaign(false)
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

   if (!newCampaign) return <h1>Loading...</h1>

   return (
      <div className="edit-campaign flex">

         <form className='campaign-edit-form flex' onSubmit={onSaveCampaign}>
            <div className="flex column">
               <p>{t('Campaign name')} </p>
               <input autoComplete='off' onChange={handleChange} autoFocus className='campaign-input' value={campaignName}
                  placeholder={t('Fullname')} variant='filled' type='text' name='campaignName' />
            </div>

            <div className="flex column">
               <p>{t('Campaign Manager')} </p>
               <select onChange={handleChange} value={campaignManager} name='campaignManager'>

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
               <textarea min="2" rows="3" autoComplete='off' onChange={handleChange} className='campaign-input' value={message}
                  placeholder={t('Message')} variant='filled' type='text' name='message'></textarea>
            </div>

            <button className="save" onClick={onSaveCampaign}>{t('Save')}</button>
         </form>
         <button className="close-btn" onClick={async () => {
            await dispatch(getActionSetCampaign(null))
            setIsEditCampaign(false)
         }
         }
         >x</button>
      </div>)
}