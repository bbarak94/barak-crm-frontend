import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next';

import { loadUsers, updateUser } from '../store/actions/user.action'

import { ZoneList } from '../cmps/zone-list.jsx'

export const ZoneApp = () => {
   const dispatch = useDispatch()
   const navigation = useNavigate()
   const { t, i18n } = useTranslation();

   const { user } = useSelector((storeState) => storeState.userModule)

   const [zones, setZones] = useState(user.zones)

   useEffect(() => {
      if (!user) { navigation('/') }
   }, [])
   
   useEffect(() => {
      setZones(user.zones)
   }, [user])
   

   if (!user) return (
      <section className='zones-app'>
         <h1 className='title'>{t('You need to login first')}</h1>
      </section>
   )

   const onRefreshZones = async () => {
      await dispatch(loadUsers())
   }

   const onAdd = async (ev) => {
      ev.preventDefault()
      ev.stopPropagation()
      var newZones = [...zones]
      newZones.push(
         {
            name: '',
            city: '',
            streets: ['']
         }
      )
      var newUser = { ...user }
      newUser.zones = newZones
      await dispatch(updateUser(newUser))
   }

   return (
      <section className='zone-app'>
         <div className='zone-status flex column'>
            <div className='flex'>
               <button onClick={(ev) => onAdd(ev)}>{t('Add zone')}</button>
               <button onClick={() => { onRefreshZones() }}>{t('Refresh')}</button>
            </div>
            <h1 style={{ margin: 'auto 0' }}>{t('Total zones')}: {zones.length}</h1>
         </div>
         {zones.length && (<ZoneList user={user} zones={user.zones} />)}
      </section>
   )
}