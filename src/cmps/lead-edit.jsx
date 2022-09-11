import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { leadService } from "../services/lead.service"
import { saveLead, loadLeads, getActionSetLead } from "../store/actions/lead.action"

import Autocomplete from "react-google-autocomplete";

export const LeadEdit = ({ setIsEdit }) => {
   const dispatch = useDispatch()
   const { t, i18n } = useTranslation();

   const { user } = useSelector((storeState) => storeState.userModule)
   var { lead } = useSelector((storeState) => storeState.leadModule)

   const [newLead, setNewLead] = useState()
   const [_id, set_id] = useState(lead?._id || '')
   const [fullname, setFullname] = useState(lead?.fullname || '')
   const [phoneNumber, setPhoneNumber] = useState(lead?.phoneNumber || '')
   // const [address, setAddress] = useState(lead?.address || '')
   const [message, setMessage] = useState(lead?.message || '')
   const [createdAt, setCreatedAt] = useState(lead?.createdAt || '')
   // const [estSupply, setEstSupply] = useState(lead?.estSupply || '')
   const [email, setEmail] = useState(lead?.email || '')
   // const [totalPrice, setTotalPrice] = useState(lead?.totalPrice || '')
   // const [dishes, setDishes] = useState(lead?.dishes || '')
   const [status, setStatus] = useState(lead?.status || '')

   useEffect(() => {
      const getEmptyLead = async () => {
         const emptyLead = await leadService.getEmptyLead()
         setNewLead(emptyLead)
         set_id(emptyLead._id || '')
         setFullname(emptyLead.fullname)
         setPhoneNumber(emptyLead.phoneNumber)
         // setAddress(emptyLead.address)
         setMessage(emptyLead.message)
         setCreatedAt(emptyLead.createdAt)
         // setEstSupply(emptyLead.estSupply)
         setEmail(emptyLead.email)
         // setTotalPrice(emptyLead.totalPrice)
         // setDishes(emptyLead.dishes)
         setStatus(emptyLead.status)
      }

      (!lead) ? getEmptyLead() : setNewLead(lead)
   }, [])

   const handleChange = (ev, place = '') => {
      const field = ev.target?.name
      const value = ev.target?.value
      switch (field) {
         case 'fullname':
            setFullname(value)
            break
         case 'phone_number':
            setPhoneNumber(value)
            break
         // case 'address':
         //    setAddress(value)
         //    break
         case 'message':
            setMessage(value)
            break
         // case 'estSupply':
         //    const newEstSupply = getTimeStamp(value)
         //    setEstSupply(newEstSupply)
         //    break
         case 'email':
            setEmail(value)
            break
         // case 'totalPrice':
         //    setTotalPrice(value)
         //    break
         // case 'dishes':
         //    setDishes(value)
         //    break
         case 'status':
            setStatus(value)
            break
      }
   }

   const onSaveLead = async (ev) => {
      ev.preventDefault()
      const leadToSave = {
         fullname,
         phoneNumber,
         createdAt: Date.now(),
         // dishes,
         // address,
         message,
         // estSupply,
         // restaurantName: newLead.restaurantName,
         // restaurantId: newLead.restaurantId,
         // packageId: newLead.packageId,
         email,
         status,
         // totalPrice,
      }

      if (newLead) leadToSave['_id'] = newLead._id
      await dispatch((saveLead(leadToSave)))
      await dispatch(loadLeads(user._id))
      await dispatch(getActionSetLead(null))
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

   if (!newLead) return <h1>Loading...</h1>

   return (
      <div className="edit-lead flex">

         <form className='lead-edit-form flex' onSubmit={onSaveLead}>
         <div className="flex column">
               <p>{t('Status')} </p>
               <select onChange={handleChange} value={status} name='status'>
                  {/* <option value="Not printed">{t('Not printed')}</option>
                  <option value="Printed">{t('Printed')}</option> */}
                  <option value="New">{t('New')}</option>
                  <option value="New plus call">{t('New plus call')}</option>
                  <option value="No response">{t('No response')}</option>
                  <option value="In the treatment - an initial contact is made">{t('In the treatment - an initial contact is made')}</option>
                  <option value="Return to the customer - no call was made">{t('Return to the customer - no call was made')}</option>
                  <option value="A quote has been sent">{t('A quote has been sent')}</option>
                  <option value="A meeting is scheduled">{t('A meeting is scheduled')}</option>
                  <option value="A deal was closed">{t('A deal was closed')}</option>
                  <option value="No response several times">{t('No response several times')}</option>
                  <option value="Not interested for now">{t('Not interested for now')}</option>
                  <option value="Returning appeal">{t('Returning appeal')}</option>
                  <option value="black list">{t('black list')}</option>
                  <option value="Not a business owner">{t('Not a business owner')}</option>
                  <option value="After coordination - sending details via Whatsapp">{t('After coordination - sending details via Whatsapp')}</option>
                  <option value="return in the distant future">{t('return in the distant future')}</option>
                  <option value="Not relevant - didn't let him talk">{t('Not relevant - didn\'t let him talk')}</option>
                  <option value="Existing Customer">{t('Existing Customer')}</option>
               </select>
            </div>
            <div className="flex column">
               <p>{t('Fullname')} </p>
               <input autoComplete='off' onChange={handleChange} autoFocus className='lead-input' value={fullname}
                  placeholder={t('Fullname')} variant='filled' type='text' name='fullname' />
            </div>
            <div className="flex column">
               <p>{t('Phone Number')} </p>
               <input autoComplete='off' onChange={handleChange} className='`lead`-input' value={phoneNumber}
                  placeholder={t('Phone Number')} variant='filled' type='text' name='phone_number' />
            </div>
            {/* <div className="flex column">
               <p>{t('Address')} </p>
               <Autocomplete
                  placeholder={address}
                  apiKey={'AIzaSyABgO4oUpqijXboPo2k0niWE_RERjLtsN0'}
                  language="iw"
                  options={{
                     types: ["address"],
                     fields: ["formatted_address"],
                     componentRestrictions: { country: "il" },
                  }}
                  onPlaceSelected={(place) => {
                     setAddress(place.formatted_address)
                  }}
               />
            </div> */}
            {/* <div className="flex column">
               <p>{t('Estimate supply time')} </p>
               <input autoComplete='off' onChange={handleChange} className='lead-input' value={getTime(estSupply)}
                  placeholder={t('Estimate supply in minutes')} variant='filled' type='time' name='estSupply' />
            </div> */}
            <div className="flex column">
               <p>{t('Email')} </p>
               <input autoComplete='off' onChange={handleChange} className='lead-input' value={email}
                  placeholder={t('Email')} variant='filled' type='text' name='email' />
            </div>
            {/* <div className="flex column">
               <p>{t('Total price')} </p>
               <input autoComplete='off' onChange={handleChange} className='lead-input' value={totalPrice}
                  placeholder={t('Total price')} variant='filled' type='number' min={0} name='totalPrice' />
            </div> */}
            {/* <div className="flex column">
               <p>{t('Dishes')} </p>
               <input autoComplete='off' onChange={handleChange} className='lead-input' value={dishes}
                  placeholder={t('Dishes')} variant='filled' type='text' name='dishes' />
            </div> */}
            {/* <div className="flex column message">
               <p>{t('Message')} </p>
               <input autoComplete='off' onChange={handleChange} className='lead-input' value={message}
                  placeholder={t('Message')} variant='filled' type='text' name='message'/>
            </div> */}
            <div className="flex column message">
               <p>{t('Message')} </p>
               <textarea min="2" rows="3" autoComplete='off' onChange={handleChange} className='lead-input' value={message}
                  placeholder={t('Message')} variant='filled' type='text' name='message'></textarea>
            </div>
            
            <button className="save" onClick={onSaveLead}>{t('Save')}</button>
         </form>
         <button className="close-btn" onClick={async () => {
            await dispatch(getActionSetLead(null))
            setIsEdit(false)
         }
         }
         >x</button>
      </div>)
}