import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import { useTranslation } from 'react-i18next';
import { campaignService } from "../services/campaign.service"

import { removeCampaign, setCampaign, saveCampaign, loadCampaigns, getActionSetCampaign } from "../store/actions/campaign.action"

import { PrinterModal } from './printer-modal'


export const CampaignPreview = ({ user, setIsEdit, campaign }) => {
   const dispatch = useDispatch()
   const { t, i18n } = useTranslation();

   // const [zoneName, setZoneName] = useState('')
   const [newCampaign, setNewCampaign] = useState()
   const [modal, setModal] = useState(false);
   const [_id, set_id] = useState(campaign?._id || '')
   const [campaignName, setCampaignName] = useState(campaign?.campaignName || '')
   const [campaignManager, setCampaignManager] = useState(campaign?.campaignManager || '')
   const [message, setMessage] = useState(campaign?.message || '')
   const [createdAt, setCreatedAt] = useState(campaign?.createdAt || '')


   useEffect(() => {
      const getEmptyCampaign = async () => {
         const emptyCampaign = await campaignService.getEmptyCampaign()
         setNewCampaign(emptyCampaign)
         set_id(emptyCampaign._id || '')
         setCampaignName(emptyCampaign.campaignName)
         setCampaignManager(emptyCampaign.campaignManager)
         // setPhoneNumber(emptyCampaign.phoneNumber)
         // setAddress(emptyCampaign.address)
         // setMessage(emptyCampaign.message)
         setCreatedAt(emptyCampaign.createdAt)
         // setEstSupply(emptyCampaign.estSupply)
         // setTotalPrice(emptyCampaign.totalPrice)
         // setDishes(emptyCampaign.dishes)
         // setStatus(emptyCampaign.status)
      }

      (!campaign) ? getEmptyCampaign() : setNewCampaign(campaign)
      // setNewCampaign(emptyCampaign)
      // setZone()
   }, [])

   const toggleModal = () => {
      setModal(!modal);
   }

   if (modal) {
      document.body.classList.add('active-modal')
   } else {
      document.body.classList.remove('active-modal')
   }

   // const onPrint = async () => {
   //    toggleModal()
   //    const newCampaign = { ...campaign }
   //    newCampaign.status = 'Printed'
   //    await dispatch((saveCampaign(newCampaign)))
   // }

   // const setZone = (ev) => {
   //    user.zones.map((zone, idx) => {
   //       zone.streets.map((street) => {
   //          if (campaign.address.includes(zone.city) && campaign.address.includes(street)) setZoneName(zone.name)
   //       })
   //    })
   // }

   const handleChange = (ev) => {
      const field = ev.target?.name
      const value = ev.target?.value
      console.log('field:', field)
      console.log('value:', value)
      const newCampaign = campaign
      newCampaign.status = value
      setNewCampaign(newCampaign)
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
      onSaveCampaign()
   }

   const onSaveCampaign = async (ev) => {
      // ev.preventDefault()
      const campaignToSave = {
         // fullname,
         // phoneNumber,
         campaignName,
         campaignManager,
         createdAt: Date.now(),
         // dishes,
         // address,
         // message,
         // estSupply,
         // restaurantName: newCampaign.restaurantName,
         // restaurantId: newCampaign.restaurantId,
         // packageId: newCampaign.packageId,
         status:campaign.message
         // totalPrice,
      }

      if (newCampaign) campaignToSave['_id'] = newCampaign._id
      console.log('campaignToSave:', campaignToSave)
      await dispatch((saveCampaign(campaignToSave)))
      await dispatch(loadCampaigns(user._id))
      await dispatch(getActionSetCampaign(null))
      setIsEdit(false)
   }


   const getTime = (timeStamp) => {
      const time = new Date(timeStamp)
      let hour = time.getHours();
      hour = ('0' + hour).slice(-2);
      let minute = time.getMinutes();
      minute = ('0' + minute).slice(-2);
      const timeToShow = time.getDate()

      // return `${hour}:${minute}`
      return `${time.toLocaleString()}`
   }

   // if (document.body.dir === 'ltr') {
   //    var price = (+campaign.totalPrice).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
   // } else {
   //    var price = (+campaign.totalPrice).toLocaleString('il-HE', { style: 'currency', currency: 'ILS' })
   // }

   return (
      <>
 

         <td>
            {campaign._id}
         </td>
         <td>
            {getTime(campaign.createdAt)}
         </td>
         <td>
            {campaign.campaignName}
         </td>
         <td>
            {campaign.campaignManager}
         </td>
         <td>
            {campaign.message}
         </td>
         <td>
            {campaign.channels.length | 0}
         </td>

         <td>
            <button onClick={async () => {
               await dispatch(setCampaign(campaign._id))
               setIsEdit(true)
            }}>{t('Edit')}</button>
            {/* <button onClick={() => onPrint()}>{t('Print')}</button> */}
            <button onClick={() => {
               dispatch(removeCampaign(campaign._id))
            }}>{t('Delete')}</button>
         </td>
      </>
   )
}
