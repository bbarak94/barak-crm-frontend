import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from 'react-i18next';
import { leadService } from "../services/lead.service"

import { removeStatus, setStatus, saveStatus, loadStatuses, getActionSetStatus } from "../store/actions/status.action"

export const StatusPreview = ({ user, setIsEdit, status }) => {
   const dispatch = useDispatch()
   const { t, i18n } = useTranslation();
   const { users } = useSelector((storeState) => storeState.userModule)

   // const [zoneName, setZoneName] = useState('')
   const [newStatus, setNewStatus] = useState()
   const [modal, setModal] = useState(false);
   const [_id, set_id] = useState(status?._id || '')
   const [statusName, setStatusName] = useState(status?.statusName || '')
   const [statusType, setStatusType] = useState(status?.statusType || '')
   const [color, setColor] = useState(status?.color || 'black')
   const [backgroundColor, setBackgroundColor] = useState(status?.backgroundColor || 'white')


   useEffect(() => {
      const getEmptyStatus = async () => {
         const emptyStatus = await leadService.getEmptyStatus()
         setNewStatus(emptyStatus)
         set_id(emptyStatus._id || '')
         setStatusName(emptyStatus.statusName)
         setStatusType(emptyStatus.statusType)
         setColor(emptyStatus.color)
         setBackgroundColor(emptyStatus.backgroundColor)
      }

      (!status) ? getEmptyStatus() : setNewStatus(status)
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
      const newStatus = status
      switch (field) {
         case 'statusName':
            setStatusName(value)
            newStatus.statusName = value
            break
         case 'statusType':
            setStatusType(value)
            newStatus.statusType = value
            break
         case 'color':
            setColor(value)
            newStatus.color = value
            break
         case 'backgroundColor':
            setBackgroundColor(value)
            newStatus.backgroundColor = value
            break

      }
      setNewStatus(newStatus)
      onSaveStatus()
   }

   const onSaveStatus = async (ev) => {
      // ev.preventDefault()
      const statusToSave = {
         statusName,
         statusType,
         color,
         backgroundColor,
      }

      if (newStatus) statusToSave['_id'] = newStatus._id
      await dispatch((saveStatus(statusToSave)))
      await dispatch(loadStatuses(user._id))
      await dispatch(getActionSetStatus(null))
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
            {status._id}
         </td>

         <td>
            {status.statusName}
         </td>
         <td>
         <select onChange={handleChange} value={statusType} name='statusType'>
                     <option value="In Progress">{t('In Progress')}</option>
                     <option value="Not in Progress">{t('Not in Progress')}</option>
                     <option value="Succeeded">{t('Succeeded')}</option>
                     <option value="Failed">{t('Failed')}</option>
                  </select>
         </td>
         <td>
            {status.color}
         </td>
         <td>
            {status.backgroundColor}
         </td>
         
         <td>
            <button onClick={async () => {
               await dispatch(setStatus(status._id))
               setIsEdit(true)
            }}>{t('Edit')}</button>
            <button onClick={() => {
               dispatch(removeStatus(status._id))
            }}>{t('Delete')}</button>
         </td>
      </>
   )
}
