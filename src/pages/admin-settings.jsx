import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from 'react-i18next'
import { loadUsers, updateUser } from '../store/actions/user.action'


export const AdminSettings = () => {
   const { t, i18n } = useTranslation();
   const dispatch = useDispatch()

   const { user } = useSelector((storeState) => storeState.userModule)
   const { users } = useSelector((storeState) => storeState.userModule)

   const [userToEdit, setUserToEdit] = useState(user)
   const [userId, setUserId] = useState(user._id)
   const [isEdit, setIsEdit] = useState(false)

   const handleChange = (ev) => {
      const value = ev.target?.value
      setUserId(value)
   }

   const selectUser = (ev) => {
      ev.preventDefault()
      const selected = users.find(u => u._id === userId)
      setUserToEdit(selected)
      setIsEdit(true)
   }

   const handleEditChange = (ev) => {
      const field = ev.target?.name
      const value = ev.target?.value
      const newUser = { ...userToEdit }

      switch (field) {
         case 'fullname':
            newUser.fullname = value
            break
         case 'username':
            newUser.username = value
            break
         case 'isAdmin':
            if (value === 'false') newUser.isAdmin = false
            else newUser.isAdmin = true
            break
         case 'apiKey':
            newUser.API_KEY = value
            break
      }
      setUserToEdit(newUser)
   }

   const saveUser = async (ev) => {
      ev.preventDefault()
      setIsEdit(false)
      await dispatch(updateUser(userToEdit))
      await dispatch(loadUsers())

   }

   return (
      <section className='settings-app admin-settings flex column align-center'>
         <form className="flex column justify-center align-center" onSubmit={selectUser}>
            <h1 className="title">{t('Admin settings')}:</h1>
            <select onChange={handleChange} name='userId'>
               {users.map((u, idx) => {
                  return <option key={idx} value={u._id}>{u.fullname}</option>
               })}
            </select>
            <button onClick={() => selectUser}>{t('Select')}</button>
         </form>
         {isEdit &&
            <section className="admin-edit">
               <form className="flex column">
                  <button onClick={() => { setIsEdit(false) }} className="flex justify-center align-center esc-btn">x</button>
                  <div className="flex align-center">
                     <label>{t('Fullname')}:</label>
                     <input autoComplete='off' onChange={handleEditChange} autoFocus value={userToEdit.fullname} placeholder={t('Fullname')} type='text' name='fullname' />
                  </div>
                  <div className="flex align-center">
                     <label>{t('Username')}:</label>
                     <input autoComplete='off' onChange={handleEditChange} value={userToEdit.username} placeholder={t('Username')} type='text' name='username' />
                  </div>
                  <div className="flex align-center">
                     <label>{t('Permission')}:</label>
                     <select onChange={handleEditChange} value={userToEdit.isAdmin} name='isAdmin'>
                        <option value={false}>{t('Not admin')}</option>
                        <option value={true}>{t('Admin')}</option>
                     </select>
                  </div>
                  {/* <div className="flex align-center">
                     <label>{t('API Key')}:</label>
                     <input className="input-api" autoComplete='off' onChange={handleEditChange} value={userToEdit.API_KEY} placeholder={t('Api key')} type='text' name='apiKey' />
                  </div> */}
                  <button onClick={saveUser}>{t('Save')}</button>
               </form>
            </section>
         }
      </section >

   )
}
