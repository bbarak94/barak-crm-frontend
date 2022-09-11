import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import { useTranslation } from 'react-i18next';
import { leadService } from "../services/lead.service"

import { removeLead, setLead, saveLead, loadLeads, getActionSetLead } from "../store/actions/lead.action"

import { PrinterModal } from './printer-modal'


export const LeadPreview = ({ user, setIsEdit, lead }) => {
   const dispatch = useDispatch()
   const { t, i18n } = useTranslation();

   // const [zoneName, setZoneName] = useState('')
   const [newLead, setNewLead] = useState()
   const [modal, setModal] = useState(false);
   const [_id, set_id] = useState(lead?._id || '')
   const [status, setStatus] = useState(lead?.status || '')
   const [fullname, setFullname] = useState(lead?.fullname || '')
   const [phoneNumber, setPhoneNumber] = useState(lead?.phoneNumber || '')
   const [message, setMessage] = useState(lead?.message || '')
   const [createdAt, setCreatedAt] = useState(lead?.createdAt || '')
   const [email, setEmail] = useState(lead?.email || '')


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
      // setNewLead(emptyLead)
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
   //    const newLead = { ...lead }
   //    newLead.status = 'Printed'
   //    await dispatch((saveLead(newLead)))
   // }

   // const setZone = (ev) => {
   //    user.zones.map((zone, idx) => {
   //       zone.streets.map((street) => {
   //          if (lead.address.includes(zone.city) && lead.address.includes(street)) setZoneName(zone.name)
   //       })
   //    })
   // }

   const handleChange = (ev) => {
      const field = ev.target?.name
      const value = ev.target?.value
      console.log('field:', field)
      console.log('value:', value)
      const newLead = lead
      newLead.status = value
      setNewLead(newLead)
      switch (field) {
         case 'status':
            console.log('test')
            setStatus(value)
            break
      }
      console.log('lead:',lead)
      onSaveLead()
   }

   const onSaveLead = async (ev) => {
      // ev.preventDefault()
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
         status:lead.status,
         // totalPrice,
      }

      if (newLead) leadToSave['_id'] = newLead._id
      console.log('leadToSave:', leadToSave)
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
         {/* <td className="package-id">
         {modal && <PrinterModal toggleModal={toggleModal} modal={modal} lead={lead} user={user} getTime={getTime} zoneName={zoneName} />}
            {lead.packageId}
         </td> */}
         {/* <td>
            {lead.restaurantName}
         </td> */}
         {/* <td>
            {lead.customerName}
         </td> */}
         <td>
            {lead._id}
         </td>
         <td>
            {getTime(lead.createdAt)}
         </td>
         <td>
            <form className='lead-edit-form flex' onSubmit={onSaveLead}>
               <div className="flex column">
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
            </form>


            {/* {t(`${lead.status}`)} */}
         </td>
         <td>
            {lead.fullname}
         </td>
         <td>
            {lead.phoneNumber}
         </td>
         <td>
            {lead.email}
         </td>
         <td>
            {lead.message}
         </td>
         {/* <td>
            {(zoneName) && <>
               <span>{zoneName}</span>
               <br />
            </>}
            {lead.address}
         </td>
         <td>
            {lead.addressComments}
         </td> */}
         {/* <td>
            {getTime(lead.estSupply)}
         </td>
         <td>
            {lead.source}
         </td>
         <td>
            {price}
         </td> */}

         {/* <td>
            {lead.dishes}
         </td> */}
         <td>
            <button onClick={async () => {
               await dispatch(setLead(lead._id))
               setIsEdit(true)
            }}>{t('Edit')}</button>
            {/* <button onClick={() => onPrint()}>{t('Print')}</button> */}
            <button onClick={() => {
               dispatch(removeLead(lead._id))
            }}>{t('Delete')}</button>
         </td>
      </>
   )
}
