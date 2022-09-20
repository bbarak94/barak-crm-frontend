import { userService } from "./user.service"
import { utilService } from './util.service.js'
import { httpService } from "./http.service"

const STORAGE_KEY_CAMPAIGNS = 'campaigns'

export const campaignService = {
   query,
   getById,
   save,
   remove,
   getEmptyCampaign,
   saveLocalCampaigns,
   getAllCampaigns
}


async function query(userId) {
   const campaigns =  await httpService.get(`campaign/byUser/${userId}`)
   saveLocalCampaigns(campaigns)
   return campaigns
}

async function getById(campaignId) {
   const campaign = await httpService.get(`campaign/byCampaign/${campaignId}`)
   
   return campaign
}

async function remove(campaignId) {
   return await httpService.delete(`campaign/${campaignId}`)
}

async function save(campaign) {
   var savedCampaign
   if (campaign._id) {
      savedCampaign = await httpService.put(`campaign/`, campaign)
      // campaignChannel.postMessage(getActionUpdateCampaign(savedCampaign))
   } else {
      savedCampaign = await httpService.post(`campaign/`, campaign)
      // campaignChannel.postMessage(getActionAddCampaign(savedCampaign))
   }
   return savedCampaign
}


async function getEmptyCampaign() {
   // const user = await userService.getLoggedinUser()
   var now = new Date(Date.now())
   // var est = new Date(Date.now())
   const newCampaign = {
      // restaurantName: user.fullname,
      // restaurantId: user._id,
      // packageId: utilService.makeNum(),
      createdAt: now,
      campaignName: '',
      // status: 'New',
      campaignManager: '',
      // customerName: '',
      // addressComments: '',
      // estSupply: est.setMinutes(now.getMinutes() + 20),
      // source: '',
      // totalPrice: '',
      // dishes: []
   }
   return newCampaign
}

function saveLocalCampaigns(campaigns) {
   sessionStorage.setItem(STORAGE_KEY_CAMPAIGNS, JSON.stringify(campaigns))
   return campaigns
}

function getAllCampaigns() {
   return JSON.parse(sessionStorage.getItem(STORAGE_KEY_CAMPAIGNS)) || []
}