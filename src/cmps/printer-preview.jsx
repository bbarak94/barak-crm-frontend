import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next';

import { updateUser } from '../store/actions/user.action';

export const PrinterPreview = ({ onRefreshPrinters, user, printer }) => {
   const { t, i18n } = useTranslation();
   const dispatch = useDispatch()

   const [name, setName] = useState(printer.customName)
   const [isEdit, setIsEdit] = useState(false)

   const toggleSelect = async () => {
      const newUser = { ...user }
      const pId = printer.id + ''
      if (!newUser.activePrinters.length) {
         newUser.activePrinters.push(createNewPrinter(pId, printer.name, true))
      } else {
         const found = newUser.activePrinters.find((p) => p.id === pId)
         if (found) found.isSelected = !found.isSelected
         else newUser.activePrinters.push(createNewPrinter(pId, printer.name, !printer.isSelected))
      }
      await dispatch(updateUser(newUser))
      await onRefreshPrinters()
   }

   const createNewPrinter = (pId, name, isSelected) => {
      const newPrinter = {
         id: pId,
         customName: name,
         isSelected
      }
      return newPrinter
   }

   const onEdit = (ev) => {
      ev.stopPropagation()
      setIsEdit(!isEdit)
   }

   const handleChange = (ev) => {
      ev.stopPropagation()
      const value = ev.target.value
      setName(value)
   }

   const onChangeName = async (ev, def = false) => {
      ev.stopPropagation()
      ev.preventDefault()
      const newUser = { ...user }
      const newPrinter = newUser.activePrinters.find(p => (p.id + '') === (printer.id + ''))
      if (!newPrinter) newUser.activePrinters.push(createNewPrinter((printer.id + ''), name, false))
      else if (def) newPrinter.customName = printer.name
      else newPrinter.customName = name
      await dispatch(updateUser(newUser))
      await onRefreshPrinters()
      setIsEdit(!isEdit)
   }

   return (
      <li className={`printer-preview ${(printer.isSelected) ? 'bg-good' : 'bg-bad'}`} onClick={() => toggleSelect()}>
         {!isEdit && <h4 onClick={(ev) => onEdit(ev)}
         >{(printer.customName) ? printer.customName : printer.name}</h4>
         }
         {isEdit &&
            <form onClick={(ev) => { ev.stopPropagation() }} className='flex column' style={{ width: '100%' }} onSubmit={(ev) => onChangeName(ev)}>
               <button className="close-btn" onClick={() => setIsEdit(false)}>
                  <h3>x</h3>
               </button>
               <input onChange={handleChange} autoFocus className='user-input' autoComplete='off'
                  placeholder={printer.name} variant='filled' type='text' name='fullname' />
               <div className='flex space-between'>
                  <button onClick={(ev) => onChangeName(ev)}>{t('Save')}</button>
                  <button onClick={(ev) => onChangeName(ev, true)}>{t('Default')}</button>
               </div>
            </form>
         }
         <p>
            {t('Status')}: <span>
               {t(printer.state)}
            </span>
         </p>
      </li>
   )
}