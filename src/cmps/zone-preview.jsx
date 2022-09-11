import { useEffect, useState } from "react"
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { updateUser } from '../store/actions/user.action';

import { StreetPreview } from './street-preview.jsx'
import { useNavigate } from "react-router-dom";

export const ZonePreview = ({ idx, user, zones, zone }) => {
   const dispatch = useDispatch()
   const navigation = useNavigate()
   const { t, i18n } = useTranslation();

   const [name, setName] = useState(zone.name)
   const [city, setCity] = useState(zone.city)

   const [isNameEdit, setIsNameEdit] = useState(false)
   const [isCityEdit, setIsCityEdit] = useState(false)

   useEffect(() => {
      if (!zone.name) setIsNameEdit(true)
      if (!zone.city) setIsCityEdit(true)
   }, [])

   useEffect(() => {
      navigation('/zones')
   }, [user])
   

   const handleChange = (ev) => {
      const field = ev.target?.name
      const value = ev.target?.value

      switch (field) {
         case 'name':
            setName(value)
            break
         case 'city':
            setCity(value)
            break
      }
   }

   const onClose = () => {
      setIsNameEdit(false)
      setName(zone.name)
   }

   const onRemove = async (ev) => {
      var newZones = [...zones]
      newZones.splice(idx)
      var newUser = { ...user }
      newUser.zones = newZones
      await dispatch(updateUser(newUser))
   }

   const onAdd = async (ev) => {
      ev.stopPropagation()
      ev.preventDefault()
      var newZones = [...zones]
      newZones[idx].streets.push('')
      var newUser = { ...user }
      newUser.zones = newZones
      await dispatch(updateUser(newUser))

   }

   const onSave = async (ev, type) => {
      ev.stopPropagation()
      ev.preventDefault()
      var newZones = [...zones]
      var newZone = { ...zone }
      newZones[idx] = newZone
      switch (type) {
         case 'name':
            if (!name) return
            newZone.name = name
            setIsNameEdit(false)
            break
         case 'city':
            if (!city) return
            newZone.city = city
            setIsCityEdit(false)
            break
      }
      var newUser = { ...user }
      newUser.zones = newZones
      await dispatch(updateUser(newUser))
   }

   return (
      <li className='zone-preview flex column align-center' >
         <button onClick={(ev) => onRemove(ev)} className='zone-remove-btn'>x</button>
         {(!isNameEdit) && (
            <div className="zone-name-preview" onClick={() => { setIsNameEdit(true) }}>
               <h2>{zone.name}</h2>
            </div>
         )}
         {(isNameEdit) && (
            <form className="zone-name-edit  flex align-center" style={{ width: '100%' }} onSubmit={onSave}>
               <input autoComplete='off' onChange={handleChange} autoFocus value={name} placeholder={t('Zone name')} type='text' name='name' />
               <button className="save-btn" onClick={(ev) => onSave(ev, 'name')}>{t('Save')}</button>
               <button className="close-btn" onClick={() => onClose()}>x</button>
            </form>
         )}
         {(!isCityEdit) && (<div className="city-name-preview flex align-center" onClick={() => { setIsCityEdit(true) }}>
            <h2>{t('City')}:
            </h2>
            <h3>
               {zone.city}
            </h3>
         </div>)}
         {(isCityEdit) && (
            <form className="city-name-edit flex align-center">
               <input autoComplete='off' onChange={handleChange} autoFocus value={city} placeholder={t('City name')} type='text' name='city' />
               <button className="save-btn" onClick={(ev) => onSave(ev, 'city')}>{t('Save')}</button>
               <button className="close-btn" onClick={() => {
                  setIsCityEdit(false)
                  setCity(zone.city)
               }}>x</button>
            </form>
         )}
         <hr />
         <h2>{t('Streets')}:</h2>
         {zone.streets.map((street, sIdx) => {
            return (<StreetPreview key={sIdx} sIdx={sIdx} idx={idx} user={user} zones={zones} zone={zone} street={street} />)
         })}
         <button onClick={(ev) => onAdd(ev)}>{t('Add')}</button>
      </li>
   )
}
