
import { leadService } from "../../services/lead.service"
const initialState = {
   leads: leadService.getAllLeads(),
   lead: null,
}


export function leadReducer(state = initialState, action) {
   var newState = state
   var leads
   switch (action.type) {
      case 'SET_LEADS':
         newState = { ...state, leads: action.leads }
         break
      case 'SET_LEAD':
         newState = { ...state, lead: action.lead }
         break
      case 'REMOVE_LEAD':
         const lastRemovedLead = state.leads.find(
            (lead) => lead._id === action.leadId
         )
         leads = state.leads.filter(
            (lead) => lead._id !== action.leadId
         )
         newState = { ...state, leads, lastRemovedLead }
         break
      // case 'SAVE_LEAD':
      //    newState = { ...state, lead: action.lead }
      //    break
      case 'ADD_LEAD':
         newState = { ...state, leads: [...state.leads, action.lead] }
         break
      case 'UPDATE_LEAD':
         leads = state.leads.map((lead) =>
            lead._id === action.lead._id ? action.lead : lead
         )

         newState = { ...state, lead: action.lead, leads }
         break
   }
   return newState

}