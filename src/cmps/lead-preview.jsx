import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from 'react-i18next';
import { leadService } from "../services/lead.service"


import { removeLead, setLead, saveLead, loadLeads, getActionSetLead } from "../store/actions/lead.action"

export const LeadPreview = ({ user, setIsEdit, lead }) => {
   const dispatch = useDispatch()
   const { t, i18n } = useTranslation();
   const { users } = useSelector((storeState) => storeState.userModule)

   const [newLead, setNewLead] = useState()
   const [modal, setModal] = useState(false);
   const [_id, set_id] = useState(lead?._id || '')
   const [status, setStatus] = useState(lead?.status || '')
   const [managerName, setManagerName] = useState(lead?.managerName || '')
   const [businessName, setBusinessName] = useState(lead?.businessName || '')
   const [address, setAddress] = useState(lead?.address || '')
   const [address2, setAddress2] = useState(lead?.address2 || '')
   const [classDesc, setClassDesc] = useState(lead?.classDesc || '')
   const [role, setRole] = useState(lead?.role || '')
   const [phoneNumber, setPhoneNumber] = useState(lead?.phoneNumber || '')
   const [phoneNumber2, setPhoneNumber2] = useState(lead?.phoneNumber2 || '')
   const [phoneNumber3, setPhoneNumber3] = useState(lead?.phoneNumber3 || '')
   const [message, setMessage] = useState(lead?.message || '')
   const [createdAt, setCreatedAt] = useState(lead?.createdAt || '')
   const [email, setEmail] = useState(lead?.email || '')
   const [creator, setCreator] = useState(lead?.creator || '')


   useEffect(() => {
      const getEmptyLead = async () => {
         const emptyLead = await leadService.getEmptyLead()
         setNewLead(emptyLead)
         set_id(emptyLead._id || '')
         setBusinessName(emptyLead.businessName)
         setManagerName(emptyLead.managerName)
         setPhoneNumber(emptyLead.phoneNumber)
         setClassDesc(emptyLead.classDesc)
         setPhoneNumber2(emptyLead.phoneNumber2)
         setPhoneNumber3(emptyLead.phoneNumber3)
         setRole(emptyLead.role)
         setAddress(emptyLead.address)
         setAddress2(emptyLead.address2)
         setMessage(emptyLead.message)
         setCreatedAt(emptyLead.createdAt)
         setEmail(emptyLead.email)
         setCreator(emptyLead.creator)
         setStatus(emptyLead.status)
      }

      (!lead) ? getEmptyLead() : setNewLead(lead)
      // setNewLead(emptyLead)
   }, [])

   const toggleModal = () => {
      setModal(!modal);
   }

   if (modal) {
      document.body.classList.add('active-modal')
   } else {
      document.body.classList.remove('active-modal')
   }


   const handleChange = (ev) => {
      const field = ev.target?.name
      const value = ev.target?.value
      const x = { ...lead }
      switch (field) {
         case 'status':
            setStatus(value)
            x.status = value
            break
         case 'creator':
            setCreator(value)
            x.creator = value
            break
      }
      setNewLead(x)
      onSaveLead(x)
   }

   const onSaveLead = async (x = '') => {
      // ev.preventDefault()

      const leadToSave = {
         businessName,
         managerName,
         phoneNumber,
         phoneNumber2,
         phoneNumber3,
         role,
         classDesc,
         createdAt: Date.now(),
         address,
         address2,
         message,
         email,
         creator: lead.creator,
         status: lead.status,
      }

      if (x) {
         // leadToSave['_id'] = x._id
         leadToSave._id = x._id
         leadToSave.status = x.status
         leadToSave.creator = x.creator
      }
      // await dispatch((saveLead(leadToSave)))
      await dispatch((saveLead(x)))
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
      const timeToShow = time.getDate()

      // return `${hour}:${minute}`
      return `${time.toLocaleString()}`
   }

   // if (document.body.dir === 'ltr') {
   //    var price = (+lead.totalPrice).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
   // } else {
   //    var price = (+lead.totalPrice).toLocaleString('il-HE', { style: 'currency', currency: 'ILS' })
   // }

   return (
      <>

         <td>
            {lead?._id}
         </td>

         <td>
            <div className="flex column">
               <select onChange={handleChange} value={lead.creator} name='creator'>
                  {users.map((user, idx) => {
                     return (
                        <option key={idx} value={user.fullname}>
                           {user.fullname}
                        </option>)
                  })}
                  {!users.length && <option key={0} value={creator}>
                     {creator}
                  </option>}

               </select>
            </div>
         </td>
         <td>
            {getTime(lead?.createdAt)}
         </td>
         <td>
            <form className='lead-edit-form flex' onSubmit={onSaveLead}>
               <div className="flex column">
                  <select onChange={handleChange} value={lead.status} name='status'>
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
            </form>


            {/* {t(`${lead.status}`)} */}
         </td>
         <td>
            {lead?.campaign}
         </td>
         <td>
            {lead?.channel}
         </td>
         <td>
            {lead?.managerName}
         </td>
         <td>
            {lead?.businessName}
         </td>
         <td>
            {lead?.phoneNumber}
         </td>
         <td>
            {lead?.phoneNumber2}
         </td>
         <td>
            {lead?.phoneNumber3}
         </td>
         <td>
            {lead?.classDesc}
         </td>
         <td>
            {lead?.role}
         </td>
         <td>
            {lead?.email}
         </td>
         <td>
            {lead?.address}
         </td>
         <td>
            {lead?.address2}
         </td>
         <td>
            {lead?.message}
         </td>

         <td>
            <button onClick={async () => {
               await dispatch(setLead(lead._id))
               setIsEdit(true)
            }}>{t('Edit')}</button>
            <button onClick={() => {
               dispatch(removeLead(lead._id))
            }}>{t('Delete')}</button>
         </td>
      </>
   )
}
