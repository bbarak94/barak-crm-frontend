import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { leadService } from "../services/lead.service"
import { saveLead, loadLeads, getActionSetLead } from "../store/actions/lead.action"

import Autocomplete from "react-google-autocomplete";

export const LeadEdit = ({ setIsEdit }) => {
   const dispatch = useDispatch()
   const { t, i18n } = useTranslation();
   const { user, users } = useSelector((storeState) => storeState.userModule)
   var { lead } = useSelector((storeState) => storeState.leadModule)

   const [newLead, setNewLead] = useState()
   const [_id, set_id] = useState(lead?._id || '')
   const [managerName, setManagerName] = useState(lead?.managerName || '')
   const [businessName, setBusinessName] = useState(lead?.businessName || '')
   const [phoneNumber, setPhoneNumber] = useState(lead?.phoneNumber || '')
   const [phoneNumber2, setPhoneNumber2] = useState(lead?.phoneNumber2 || '')
   const [phoneNumber3, setPhoneNumber3] = useState(lead?.phoneNumber3 || '')
   const [classDesc, setClassDesc] = useState(lead?.classDesc || '')
   const [address, setAddress] = useState(lead?.address || '')
   const [address2, setAddress2] = useState(lead?.address2 || '')
   const [role, setRole] = useState(lead?.role || '')
   const [message, setMessage] = useState(lead?.message || '')
   const [createdAt, setCreatedAt] = useState(lead?.createdAt || '')
   const [email, setEmail] = useState(lead?.email || '')
   const [status, setStatus] = useState(lead?.status || '')
   const [creator, setCreator] = useState(lead?.creator || '')

   useEffect(() => {
      const getEmptyLead = async () => {
         const emptyLead = await leadService.getEmptyLead()
         setNewLead(emptyLead)
         set_id(emptyLead._id || '')
         setManagerName(emptyLead.managerName || '')
         setBusinessName(emptyLead.businessName || '')
         setPhoneNumber(emptyLead.phoneNumber || '')
         setPhoneNumber2(emptyLead.phoneNumber2 || '')
         setPhoneNumber3(emptyLead.phoneNumber3 || '')
         setClassDesc(emptyLead.classDesc || '')
         setAddress(emptyLead.address || '')
         setAddress2(emptyLead.address2 || '')
         setRole(emptyLead.role || '')
         setMessage(emptyLead.message || '')
         setCreatedAt(emptyLead.createdAt || Date.now())
         setEmail(emptyLead.email || '')
         setStatus(emptyLead.status || 'New')
         setCreator(emptyLead.creator || 'Admin')
      }

      (!lead) ? getEmptyLead() : setNewLead(lead)
   }, [])

   const handleChange = (ev, place = '') => {
      const field = ev.target?.name
      const value = ev.target?.value
      switch (field) {
         case 'managerName':
            setManagerName(value)
            break
         case 'businessName':
            setBusinessName(value)
            break
         case 'phone_number':
            setPhoneNumber(value)
            break
         case 'phone_number2':
            setPhoneNumber2(value)
            break
         case 'phone_number3':
            setPhoneNumber3(value)
            break
         case 'classDesc':
            setClassDesc(value)
            break
         case 'address':
            setAddress(value)
            break
         case 'address2':
            setAddress2(value)
            break
         case 'role':
            setRole(value)
            break
         case 'message':
            setMessage(value)
            break
         case 'email':
            setEmail(value)
            break
         case 'status':
            setStatus(value)
            break
         case 'creator':
            setCreator(value)
            break
      }
   }

   const onSaveLead = async (ev) => {
      ev.preventDefault()
      const leadToSave = {
         managerName,
         businessName,
         phoneNumber,
         phoneNumber2,
         phoneNumber3,
         classDesc,
         address,
         address2,
         role,
         message,
         createdAt: Date.now(),
         email,
         status,
         creator
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
               <p>{t('Creator')} </p>
               <select onChange={handleChange} value={creator} name='creator'>
                  {users.map((user, idx) => {
                     return (
                        <option key={idx} value={user.fullname}>
                           {user.fullname}
                        </option>)
                  })}
               </select>
            </div>

            <div className="flex column">
               <p>{t('Business Name')} </p>
               <input autoComplete='off' onChange={handleChange} autoFocus className='lead-input' value={businessName}
                  placeholder={t('Business Name')} variant='filled' type='text' name='businessName' />
            </div>
            <div className="flex column">
               <p>{t('Manager Name')} </p>
               <input autoComplete='off' onChange={handleChange} autoFocus className='lead-input' value={managerName}
                  placeholder={t('Manager Name')} variant='filled' type='text' name='managerName' />
            </div>
            <div className="flex column">
               <p>{t('Phone Number')} </p>
               <input autoComplete='off' onChange={handleChange} className='`lead`-input' value={phoneNumber}
                  placeholder={t('Phone Number')} variant='filled' type='text' name='phone_number' />
            </div>
            <div className="flex column">
               <p>{t('Phone Number2')} </p>
               <input autoComplete='off' onChange={handleChange} className='`lead`-input' value={phoneNumber2}
                  placeholder={t('Phone Number2')} variant='filled' type='text' name='phone_number2' />
            </div>
            <div className="flex column">
               <p>{t('Phone Number3')} </p>
               <input autoComplete='off' onChange={handleChange} className='`lead`-input' value={phoneNumber3}
                  placeholder={t('Phone Number3')} variant='filled' type='text' name='phone_number3' />
            </div>
            <div className="flex column">
               <p>{t('Class Desc')} </p>
               <input autoComplete='off' onChange={handleChange} className='`lead`-input' value={classDesc}
                  placeholder={t('Class Desc')} variant='filled' type='text' name='classDesc' />
            </div>
            <div className="flex column">
               <p>{t('Address')} </p>
               <input autoComplete='off' onChange={handleChange} className='`lead`-input' value={address}
                  placeholder={t('Address')} variant='filled' type='text' name='address' />
            </div>
            <div className="flex column">
               <p>{t('Address2')} </p>
               <input autoComplete='off' onChange={handleChange} className='`lead`-input' value={address2}
                  placeholder={t('Address2')} variant='filled' type='text' name='address2' />
            </div>
            <div className="flex column">
               <p>{t('Role')} </p>
               <input autoComplete='off' onChange={handleChange} className='`lead`-input' value={role}
                  placeholder={t('Role')} variant='filled' type='text' name='role' />
            </div>



            <div className="flex column">
               <p>{t('Email')} </p>
               <input autoComplete='off' onChange={handleChange} className='lead-input' value={email}
                  placeholder={t('Email')} variant='filled' type='text' name='email' />
            </div>
            <div className="flex column">
               <p>{t('Status')} </p>
               <select onChange={handleChange} value={status} name='status'>
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