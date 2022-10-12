import { userService } from "./user.service"
import { utilService } from './util.service.js'
import { httpService } from "./http.service"

const STORAGE_KEY_LEADS = 'leads'

export const leadService = {
   query,
   getById,
   save,
   remove,
   getEmptyLead,
   saveLocalLeads,
   getAllLeads
}


async function query(userId) {
   const leads =  await httpService.get(`lead/byUser/${userId}`)
   saveLocalLeads(leads)
   return leads
}

async function getById(leadId) {
   const lead = await httpService.get(`lead/byLead/${leadId}`)
   
   return lead
}

async function remove(leadId) {
   return await httpService.delete(`lead/${leadId}`)
}

async function save(lead) {
   var savedLead
   if (lead._id) {
      savedLead = await httpService.put(`lead/`, lead)
      // leadChannel.postMessage(getActionUpdateLead(savedLead))
   } else {
      savedLead = await httpService.post(`lead/`, lead)
      // leadChannel.postMessage(getActionAddLead(savedLead))
   }
   return savedLead
}


async function getEmptyLead() {
   const user = await userService.getLoggedinUser()
   var now = new Date(Date.now())
   // var est = new Date(Date.now())
   const newLead = {
      createdAt: now,
      fullname: '',
      status: 'New',
      creator: user.fullname,
      phoneNumber: '',
      message: '',
      address: '',
      address2: ''
   }
   return newLead
}

function saveLocalLeads(leads) {
   sessionStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(leads))
   return leads
}

function getAllLeads() {
   return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LEADS)) || []
}