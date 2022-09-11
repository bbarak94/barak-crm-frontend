import { combineReducers } from 'redux'

import { userReducer } from './reducers/user.reducer.js'
import { leadReducer } from './reducers/lead.reducer.js'
import { systemReducer } from './reducers/system.reducer.js'

export const rootReducer = combineReducers({
    userModule: userReducer,
    leadModule: leadReducer,
    systemModule: systemReducer,
})
