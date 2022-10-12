import { combineReducers } from 'redux'

import { userReducer } from './reducers/user.reducer.js'
import { leadReducer } from './reducers/lead.reducer.js'
import { campaignReducer } from './reducers/campaign.reducer.js'
import { systemReducer } from './reducers/system.reducer.js'
import { statusReducer } from './reducers/status.reducer.js'

export const rootReducer = combineReducers({
    userModule: userReducer,
    leadModule: leadReducer,
    campaignModule: campaignReducer,
    systemModule: systemReducer,
    statusModule: statusReducer,
})
