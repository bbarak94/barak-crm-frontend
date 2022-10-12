
import { campaignService } from "../../services/campaign.service"
const initialState = {
   campaigns: campaignService.getAllCampaigns(),
   campaign: null,
}


export function campaignReducer(state = initialState, action) {
   var newState = state
   var campaigns

   switch (action.type) {
      case 'SET_CAMPAIGNS':
         newState = { ...state, campaigns: action.campaigns }
         break
      case 'SET_CAMPAIGN':
         newState = { ...state, campaign: action.campaign }
         break
      case 'REMOVE_CAMPAIGN':
         const lastRemovedCampaign = state.campaigns.find(
            (campaign) => campaign._id === action.campaignId
         )
         campaigns = state.campaigns.filter(
            (campaign) => campaign._id !== action.campaignId
         )
         newState = { ...state, campaigns, lastRemovedCampaign }
         break
      // case 'SAVE_CAMPAIGN':
      //    newState = { ...state, campaign: action.campaign }
      //    break
      case 'ADD_CAMPAIGN':
         newState = { ...state, campaigns: [...state.campaigns, action.campaign] }
         break
      case 'UPDATE_CAMPAIGN':
         campaigns = state.campaigns.map((campaign) =>
            campaign._id === action.campaign._id ? action.campaign : campaign
         )

         newState = { ...state, campaign: action.campaign, campaigns }
         break
   }
   return newState

}