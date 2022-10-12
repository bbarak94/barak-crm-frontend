import { userService } from '../../services/user.service.js'

const initialState = {
    user: userService.getLoggedinUser() || '',
    users: userService.getAllUsers(),
    fullMsg: {},
}

export function userReducer(state = initialState, action) {

    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.user }
        case 'UPDATE_USER':
            return { ...state, user: action.user }
        case 'SET_USERS':
            return { ...state, users: action.users }
        default:
            return state
        case 'SET_MSG':
            return { ...state, fullMsg: action.fullMsg }
    }
}
