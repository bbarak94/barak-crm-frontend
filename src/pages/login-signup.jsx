import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next';

import { login, signup, loadUsers } from '../store/actions/user.action'
import { loadLeads } from '../store/actions/lead.action'
import { loadStatuses } from '../store/actions/status.action'

export function LoginSignup() {
    const navigation = useNavigate()
    const dispatch = useDispatch()
    const { t, i18n } = useTranslation();

    const location = useLocation()
    const [fullname, setFullname] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [msg, setMsg] = useState('')

    const onLogin = async (ev = null) => {
        ev.preventDefault()
        ev.stopPropagation()
        const credentials = { username, password }
        const res = await dispatch(login(credentials))
        if (!res) {
            return
        } else if (res.isAdmin) {
            await dispatch(loadUsers())
            await dispatch(loadLeads(res._id))
            await dispatch(loadStatuses(res._id))

        }
        else {
            await dispatch(loadLeads(res._id))
        }
        navigation('/')
        setMsg('can\'t login, try again')
    }

    const onSignup = async (ev = null) => {
        ev.preventDefault()
        const credentials = { username, fullname, password }
        const res = await dispatch(signup(credentials))
        if (res) navigation('/')
    }

    const handleChange = (ev) => {
        const field = ev.target.name
        const value = ev.target.value
        switch (field) {
            case 'fullname':
                setFullname(value)
                break
            case 'username':
                setUsername(value)
                break
            case 'password':
                setPassword(value)
                break
        }
    }

    return (
        <div className='login-signup flex justify-center'>
            {
                location.pathname === '/login' && (
                    <div className='login' >
                        <form className='login-form flex column justify-center' onSubmit={onLogin}>
                            <h1 style={{ textAlign: 'center' }}>{t('Log in')}</h1>
                            <input autoComplete='off' onChange={handleChange} autoFocus className='user-input'
                                placeholder={t('Enter username')} variant='filled' type='text' name='username' />
                            <input autoComplete='off' onChange={handleChange} className='user-input'
                                placeholder={t('Enter password')} variant='filled' type='password'
                                name='password' />
                            <button onClick={onLogin} className='login-btn'>
                                {t('Log in')}
                            </button>
                        </form>
                    </div>
                )
            }
            {
                location.pathname === '/signup' && (
                    <div className='signup'>
                        <form className='signup-form flex column justify-center' onSubmit={onSignup}>
                            <h1 style={{ textAlign: 'center' }}>{t('Signup')}</h1>
                            <input autoComplete='off' onChange={handleChange} autoFocus className='user-input'
                                placeholder={t('Enter fullname')} variant='filled' type='text' name='fullname' />
                            <input autoComplete='off' onChange={handleChange}
                                className='user-input' placeholder={t('Enter username')}
                                variant='filled' type='text' name='username' />
                            <input autoComplete='off' onChange={handleChange} className='user-input'
                                placeholder={t('Enter password')} variant='filled'
                                type='password' name='password' />
                            <button onClick={onSignup} className='signup-btn'>
                                {t('Signup')}
                            </button>
                        </form>
                    </div>
                )
            }
        </div>
    )
}



