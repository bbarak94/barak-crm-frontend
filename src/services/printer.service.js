import axios from 'axios'

import { storageService } from './async-storage.service.js'

const STORAGE_KEY = 'printer'
const BASE_URL = 'https://api.printnode.com/'
// const API_KEY = 'XmHcbU2_Wmd2dXDNDQo9awDn4L88nlCwT4mlpPx_xzo'
export const printerService = {
   query,
   getById,
   save,
   remove
}

function utf8_to_b64(str) {
   return window.btoa(unescape(encodeURIComponent(str)));
}

function query(API_KEY) {
   var config = {
      method: 'get',
      url: `${BASE_URL}` + '/printers',
      headers: {
         'Authorization': `Basic ${utf8_to_b64(API_KEY)}`
      }
   };
   return axios(config)
      .then(function (res) {
         // console.log(JSON.stringify(res.data));
         if(!res) return null
         return (res.data);
      })
      .catch(function (error) {
         console.log(error);
      })

   // return axios.get(BASE_URL).then(res => res.data)
   // return storageService.query(STORAGE_KEY)
}
function getById(printerId) {
   return storageService.get(STORAGE_KEY, printerId)
}
function save(printer) {
   if (printer._id) {
      return storageService.put(STORAGE_KEY, printer)
   } else {
      return storageService.post(STORAGE_KEY, printer)
   }
}
function remove(printerId) {
   // return Promise.reject('Not now!')
   return storageService.remove(STORAGE_KEY, printerId)
}

// const BARAK_API_KEY = XmHcbU2_Wmd2dXDNDQo9awDn4L88nlCwT4mlpPx_xzo
// https://api.printnode.com/whoami/XmHcbU2_Wmd2dXDNDQo9awDn4L88nlCwT4mlpPx_xzo
// https://api.printnode.com/printers/XmHcbU2_Wmd2dXDNDQo9awDn4L88nlCwT4mlpPx_xzo