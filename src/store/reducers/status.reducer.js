
import { statusService } from "../../services/status.service"
const initialState = {
   statuses: statusService.getAllStatuses(),
   status: null,
}


export function statusReducer(state = initialState, action) {
   var newState = state
   var statuses
   switch (action.type) {
      case 'SET_STATUSS':
         newState = { ...state, statuses: action.statuses }
         break
      case 'SET_STATUS':
         console.log('setStatus')
         newState = { ...state, status: action.status }
         break
      case 'REMOVE_STATUS':
         const lastRemovedStatus = state.statuses.find(
            (status) => status._id === action.statusId
         )
         statuses = state.statuses.filter(
            (status) => status._id !== action.statusId
         )
         newState = { ...state, statuses, lastRemovedStatus }
         break
      // case 'SAVE_STATUS':
      //    newState = { ...state, status: action.status }
      //    break
      case 'ADD_STATUS':
         newState = { ...state, statuses: [...state.statuses, action.status] }
         break
      case 'UPDATE_STATUS':
         statuses = state.statuses.map((status) =>
            status._id === action.status._id ? action.status : status
         )

         newState = { ...state, status: action.status, statuses }
         break
   }
   return newState

}