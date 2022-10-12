import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { saveStatus, loadStatuses, getActionSetStatus } from "../store/actions/status.action"

import Autocomplete from "react-google-autocomplete";
import { statusService } from "../services/status.service"

export const StatusEdit = ({ setIsEdit, isEdit }) => {
   const dispatch = useDispatch()
   const { t, i18n } = useTranslation();
   const { user, users } = useSelector((storeState) => storeState.userModule)
   var { status } = useSelector((storeState) => storeState.statusModule)

   const [newStatus, setNewStatus] = useState()
   const [_id, set_id] = useState(status?._id || '')
   const [statusName, setStatusName] = useState(status?.statusName || '')
   const [statusType, setStatusType] = useState(status?.statusType || '')
   const [color, setColor] = useState(status?.color || '')
   const [backgroundColor, setBackgroundColor] = useState(status?.backgroundColor || '')


   useEffect(() => {
      const getEmptyStatus = async () => {
         const getEmptyStatus = await statusService.getEmptyStatus()
         setNewStatus(getEmptyStatus)
         set_id(getEmptyStatus._id || '')
         setStatusName(getEmptyStatus.statusName || '')
         setStatusType(getEmptyStatus.statusType || '')
         setColor(getEmptyStatus.color || '')
         setBackgroundColor(getEmptyStatus.backgroundColor || '')
      }

      (!status) ? getEmptyStatus() : setNewStatus(status)
   }, [])

   const handleChange = (ev, place = '') => {
      const field = ev.target?.name
      const value = ev.target?.value
      switch (field) {
         case 'statusName':
            setStatusName(value)
            break
         case 'statusType':
            setStatusType(value)
            break
         case 'color':
            setColor(value)
            break
         case 'backgroundColor':
            setBackgroundColor(value)
            break
      }
   }

   const onSaveLead = async (ev) => {
      ev.preventDefault()
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


   if (!newStatus) return <h1>Loading...</h1>

   if(isEdit) return (
      <div className="edit-lead flex">
         <form className='lead-edit-form flex' onSubmit={onSaveLead}>

            <div className="flex column">
               <p>{t('Status Name')} </p>
               <input autoComplete='off' onChange={handleChange} autoFocus className='lead-input' value={statusName}
                  placeholder={t('Status Name')} variant='filled' type='text' name='statusName' />
            </div>
            <div className="flex column">
               <p>{t('Status Type')} </p>
               <select onChange={handleChange} value={statusType} name='statusType'>
                  <option value="In Progress">{t('In Progress')}</option>
                  <option value="Not in Progress">{t('Not in Progress')}</option>
                  <option value="Succeeded">{t('Succeeded')}</option>
                  <option value="Failed">{t('Failed')}</option>
               </select>
            </div>
            <div className="flex column">
               <p>{t('Color')} </p>
               <input autoComplete='off' onChange={handleChange} autoFocus className='lead-input' value={color}
                  placeholder={t('Color')} variant='filled' type='text' name='color' />
            </div>
            <div className="flex column">
               <p>{t('Background Color')} </p>
               <input autoComplete='off' onChange={handleChange} autoFocus className='lead-input' value={backgroundColor}
                  placeholder={t('Background Color')} variant='filled' type='text' name='backgroundColor' />
            </div>

            <button className="save" onClick={onSaveLead}>{t('Save')}</button>
         </form>
         <button className="close-btn" onClick={async () => {
            await dispatch(getActionSetStatus(null))
            setIsEdit(false)
         }
         }
         >x</button>
      </div>)
}