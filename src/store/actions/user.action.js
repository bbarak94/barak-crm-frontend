import { userService } from '../../services/user.service'

export function loadUsers() {
    return async (dispatch) => {
        try {
            const users = await userService.getUsers()
            dispatch({ type: 'SET_USERS', users })
            return users
        } catch (err) {
            console.log('UserActions: err in loadUsers', err)
        }
    }
}

export function login(credentials) {    
    return async (dispatch) => {
        try {
            const user = await userService.login(credentials)
            dispatch({
                type: 'SET_USER',
                user,
            })
            return user
        } catch (err) {
            console.log('Cannot login', err)
        }
    }
}

export function signup(credentials) {
    return async (dispatch) => {
        try {
            const user = await userService.signup(credentials)
            dispatch({
                type: 'SET_USER',
                user,
            })
            return user
        } catch (err) {
            console.log('Cannot signup', err)
        }
    }
}

export function logout() {
    return async (dispatch) => {
        try {
            await userService.logout()
            dispatch({
                type: 'SET_USER',
                user: null,
            })
        } catch (err) {
            console.log('Cannot logout', err)
        }
    }
}

export function removeUser(userId) {
    return async (dispatch) => {
        try {
            await userService.remove(userId)
            dispatch({ type: 'REMOVE_USER', userId })
        } catch (err) {
            console.log('UserActions: err in removeUser', err)
        }
    }
}

export function updateUser(user) {
    return async (dispatch) => {
        try {
            await userService.update(user)
            dispatch({ type: 'UPDATE_USER', user })
        } catch (err) {
            console.log('UserActions: err in updateUser', err)
        }
    }
}

