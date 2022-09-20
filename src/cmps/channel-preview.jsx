import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from 'react-i18next';
import { channelService } from "../services/channel.service"

import { removeChannel, setChannel, saveChannel, loadChannels, getActionSetChannel } from "../store/actions/channel.action"

export const ChannelPreview = ({ user, setIsEdit, channel }) => {
   const dispatch = useDispatch()
   const { t, i18n } = useTranslation();
   const { users } = useSelector((storeState) => storeState.userModule)

   // const [zoneName, setZoneName] = useState('')
   const [newChannel, setNewChannel] = useState()
   const [modal, setModal] = useState(false);
   const [_id, set_id] = useState(channel?._id || '')
   const [permissions, setPermissions] = useState(channel?.perrmissions || '')
   const [createdAt, setCreatedAt] = useState(channel?.createdAt || '')
   const [channelManager, setChannelManager] = useState(channel?.channelManager || '')
   const [message, setMessage] = useState(channel?.message || '')


   useEffect(() => {
      const getEmptyChannel = async () => {
         const emptyChannel = await channelService.getEmptyChannel()
         setNewChannel(emptyChannel)
         set_id(emptyChannel._id || '')
         // setAddress(emptyChannel.address)
         setCreatedAt(emptyChannel.createdAt)
         // setEstSupply(emptyChannel.estSupply)
         setChannelManager(emptyChannel.channelManager)
         // setTotalPrice(emptyChannel.totalPrice)
         // setDishes(emptyChannel.dishes)
      }

      (!channel) ? getEmptyChannel() : setNewChannel(channel)
      // setNewChannel(emptyChannel)
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
   //    const newChannel = { ...channel }
   //    newChannel.status = 'Printed'
   //    await dispatch((saveChannel(newChannel)))
   // }

   const handleChange = (ev) => {
      const field = ev.target?.name
      const value = ev.target?.value
      const newChannel = channel
      switch (field) {
         case 'permissions':
            setPermissions(value)
            newChannel.permissions = value
            break
            case 'channelManager':
               setChannelManager(value)
            newChannel.channelManager = value
            break
      }
      setNewChannel(newChannel)
      onSaveChannel()
   }

   const onSaveChannel = async (ev) => {
      // ev.preventDefault()
      const channelToSave = {
         createdAt: Date.now(),
         // dishes,
         // address,
         message,
         // estSupply,
         // restaurantName: newChannel.restaurantName,
         // restaurantId: newChannel.restaurantId,
         // packageId: newChannel.packageId,
         creator: channel.creator,
         permissions: channel.permissions,
         // totalPrice,
      }

      if (newChannel) channelToSave['_id'] = newChannel._id
      console.log('channelToSave:', channelToSave)
      await dispatch((saveChannel(channelToSave)))
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
      const timeToShow = time.getDate()

      // return `${hour}:${minute}`
      return `${time.toLocaleString()}`
   }

   // if (document.body.dir === 'ltr') {
   //    var price = (+channel.totalPrice).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
   // } else {
   //    var price = (+channel.totalPrice).toLocaleString('il-HE', { style: 'currency', currency: 'ILS' })
   // }

   return (
      <>
         {/* <td className="package-id">
         {modal && <PrinterModal toggleModal={toggleModal} modal={modal} channel={channel} user={user} getTime={getTime} zoneName={zoneName} />}
            {channel.packageId}
         </td> */}
         {/* <td>
            {channel.restaurantName}
         </td> */}
         {/* <td>
            {channel.customerName}
         </td> */}
         <td>
            {channel._id}
         </td>

         <td>
            {channel.channelName}
         </td>
         <td>
            {getTime(channel.createdAt)}
         </td>
         <td>
            <div className="flex column">
               <select onChange={handleChange} value={channelManager} name='channelManager'>
                  {users.map((user, idx) => {
                     return (
                        <option key={idx} value={user.fullname}>
                           {user.fullname}
                        </option>)
                  })}
               </select>
            </div>
         </td>
         <td>
            <form className='channel-edit-form flex' onSubmit={onSaveChannel}>
               <div className="flex column">
                  <select onChange={handleChange} value={permissions} name='permissions'>
                     {/* <option value="Not printed">{t('Not printed')}</option>
                  <option value="Printed">{t('Printed')}</option> */}
                     <option value="">{t('Public')}</option>
                     <option value="Admin">{t('Admin only')}</option>
                  </select>
               </div>
            </form>


            {/* {t(`${channel.status}`)} */}
         </td>

         {/* <td>
            {(zoneName) && <>
               <span>{zoneName}</span>
               <br />
            </>}
            {channel.address}
         </td>
         <td>
            {channel.addressComments}
         </td> */}
         {/* <td>
            {getTime(channel.estSupply)}
         </td>
         <td>
            {channel.source}
         </td>
         <td>
            {price}
         </td> */}

         {/* <td>
            {channel.dishes}
         </td> */}
         <td>
            <button onClick={async () => {
               await dispatch(setChannel(channel._id))
               setIsEdit(true)
            }}>{t('Edit')}</button>
            {/* <button onClick={() => onPrint()}>{t('Print')}</button> */}
            <button onClick={() => {
               dispatch(removeChannel(channel._id))
            }}>{t('Delete')}</button>
         </td>
      </>
   )
}
