import { userService } from "./user.service"
import { utilService } from './util.service.js'
import { httpService } from "./http.service"

const STORAGE_KEY_CHANNELS = 'channels'

export const channelService = {
   query,
   getById,
   save,
   remove,
   getEmptyChannel,
   saveLocalChannels,
   getAllChannels
}


async function query(userId) {
   const channels = await httpService.get(`channel/byUser/${userId}`)
   saveLocalChannels(channels)
   return channels
}

async function getById(channelId) {
   const channel = await httpService.get(`channel/byChannel/${channelId}`)

   return channel
}

async function remove(channelId) {
   return await httpService.delete(`channel/${channelId}`)
}

async function save(channel) {
   var savedChannel
   if (channel._id) {
      savedChannel = await httpService.put(`channel/`, channel)
      // channelChannel.postMessage(getActionUpdateChannel(savedChannel))
   } else {
      savedChannel = await httpService.post(`channel/`, channel)
      // channelChannel.postMessage(getActionAddChannel(savedChannel))
   }
   return savedChannel
}


async function getEmptyChannel() {
   const user = await userService.getLoggedinUser()
   var now = new Date(Date.now())
   // var est = new Date(Date.now())
   const newChannel = {
      _id: utilService.makeId(),
      createdAt: now,
      channelName: '',
      status: 'New',
      channelType: 'Excel channel'
   }
   return newChannel
}

function saveLocalChannels(channels) {
   sessionStorage.setItem(STORAGE_KEY_CHANNELS, JSON.stringify(channels))
   return channels
}

function getAllChannels() {
   return JSON.parse(sessionStorage.getItem(STORAGE_KEY_CHANNELS)) || []
}