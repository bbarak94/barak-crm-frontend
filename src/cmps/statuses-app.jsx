import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';

import { loadStatuses, saveStatus } from '../store/actions/status.action'
import { userService } from '../services/user.service'

// import { StatusEdit } from '../cmps/status-edit'
import { StatusList } from '../cmps/status-list'
import { StatusEdit } from '../cmps/status-edit'




export const StatusesApp = ({ setIsEditStatuses, isEditStatuses }) => {
   const navigation = useNavigate()
   const dispatch = useDispatch()
   const { t, i18n } = useTranslation();
   const { statuses } = useSelector((storeState) => storeState.statusModule)

   const user = userService.getLoggedinUser()

   const [isEdit, setIsEdit] = useState(false)
   // const [isEditStatuses, setIsEditStatuses] = useState(true)




   const editStatuses = () => {
      setIsEditStatuses(!isEditStatuses)
   }


   useEffect(() => {
      if (!user) {
         navigation('/')
         // return
      }
      dispatch(loadStatuses(user._id))
   }, [])





   const addStatuses = async (statuses) => {

      statuses.forEach((status, idx) => {
         const statusToSave = {
            statusName: status[(t('Status Name'))] || '',
            statusType: status[(t('Status Type'))] || '',
            color: status[(t('Color'))] || '',
            backgroundColor: status[(t('Background Color'))] || '',
         }

         dispatch((saveStatus(statusToSave)))
      })
   }




   if (!user) return (
      <section className='lead-app'>
         <h1 className='title'>{t('Please login to see Statuses')}</h1>
      </section>
   )


   else return (
      <section className='statuses-app'>
         <div className='flex align-center space-between' style={{ gap: '10px', marginBottom: '5px' }}>
            <div className='flex align-center'>
               <button className='exp-btn' onClick={() => setIsEditStatuses(false)}>{t('X')}</button>
               <button className='add-btn' onClick={() => setIsEdit(true)}>{t('Add Status')}</button>
               <h1 className='title' style={{ margin: '0' }}>{t('Statuses Count')}: {statuses.length}</h1>
            </div>
         </div>
         {(isEdit) && <StatusEdit setIsEdit={setIsEdit} isEdit={isEdit} />}
         <div className='status-table'>
            <StatusList setIsEdit={setIsEdit} statuses={statuses} />
         </div>

      </section>
   )

}