import { userService } from "./user.service"
import { utilService } from './util.service.js'
import { httpService } from "./http.service"

const STORAGE_KEY_STATUSS = 'statuses'

export const statusService = {
   query,
   getById,
   save,
   remove,
   getEmptyStatus,
   saveLocalStatuses,
   getAllStatuses
}


async function query(userId) {
   const statuses =  await httpService.get(`status/byUser/${userId}`)
   saveLocalStatuses(statuses)
   return statuses
}

async function getById(statusId) {
   const status = await httpService.get(`status/byStatus/${statusId}`)
   
   return status
}

async function remove(statusId) {
   return await httpService.delete(`status/${statusId}`)
}

async function save(status) {
   var savedStatus
   if (status._id) {
      savedStatus = await httpService.put(`status/`, status)
      // statusChannel.postMessage(getActionUpdateStatus(savedStatus))
   } else {
      savedStatus = await httpService.post(`status/`, status)
      // statusChannel.postMessage(getActionAddStatus(savedStatus))
   }
   return savedStatus
}


async function getEmptyStatus() {
   const user = await userService.getLoggedinUser()
   var now = new Date(Date.now())
   // var est = new Date(Date.now())
   const newStatus = {
      statusName: '',
      statusType: '',
      color: 'black',
      backgroundColor: 'white',
   }
   return newStatus
}

function saveLocalStatuses(statuses) {
   sessionStorage.setItem(STORAGE_KEY_STATUSS, JSON.stringify(statuses))
   return statuses
}

function getAllStatuses() {
   return JSON.parse(sessionStorage.getItem(STORAGE_KEY_STATUSS)) || []
}