import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';

import { loadLeads, saveLead } from '../store/actions/lead.action'
import { userService } from '../services/user.service'

import { InsightsApp } from '../cmps/insights-app'
import { LeadEdit } from '../cmps/lead-edit'
import { LeadList } from '../cmps/lead-list'
import { LeadTable } from '../cmps/lead-table'

import { StatusesApp } from '../cmps/statuses-app.jsx'

import { LeadsTablePagination } from '../cmps/leads-table-pagination';

import * as XLSX from 'xlsx'
import { loadStatuses } from '../store/actions/status.action';
import { useEffectUpdate } from '../hooks/useEffectUpdate';
import { LeadFilter } from '../cmps/lead-filter'


export const LeadApp = () => {
   const navigation = useNavigate()
   const dispatch = useDispatch()
   const { t, i18n } = useTranslation();
   const { leads } = useSelector((storeState) => storeState.leadModule)
   const { statuses } = useSelector((storeState) => storeState.statusModule)
   const { filterBy } = useSelector((storeState) => storeState.leadModule)
   const { users } = useSelector((storeState) => storeState.userModule)
   const { campaigns } = useSelector((storeState) => storeState.campaignModule)

   const user = userService.getLoggedinUser()
   const [leadsToShow, setLeadsToShow] = useState(leads)


   const [isEdit, setIsEdit] = useState(false)
   const [isEditStatuses, setIsEditStatuses] = useState(false)


   useEffectUpdate(() => {
      loadLeads(user._id)
      filterLeads()
   }, [leads, filterBy])

   useEffect(() => {
      filterLeads()
   }, [filterBy])

   useEffect(() => {
      loadLeads(user?._id)
   }, [leads])

   useEffectUpdate(() => {
      loadLeads(user._id)
   }, [leads])

   const editStatuses = () => {
      setIsEditStatuses(!isEditStatuses)
   }
   const exportLeads = () => {

      const rows = {
         _id: "#",
         creator: "Creator",
         createdAt: "Created At",
         status: "Status",
         managerName: "שם מנהל",
         businessName: "Business Name",
         phoneNumber: "Phone Number",
         phoneNumber1: "Phone Number2",
         phoneNumber2: "Phone Number3",
         classDesc: "Classification Description",
         role: 'Role',
         email: "Email",
         address: "Address",
         address2: "Address2",
         message: "Message"
      }
      const hebRows = {
         _id: "#",
         creator: "צוות מכירות",
         createdAt: "תאריך כניסת ליד",
         status: "סטטוס",
         managerName: "שם מנהל",
         businessName: "שם עסק",
         phoneNumber: "טלפון ראשי",
         phoneNumber1: "טלפון2",
         phoneNumber2: "טלפון3",
         classDesc: "תיאור סיווג",
         role: 'תפקיד',
         email: "דוא''ל",
         address: "כתובת",
         address2: "כתובת2",
         message: "הודעה"
      }

      let csvContent = '"*","צוות מכירות","תאריך כניסת ליד","סטטוס","שם מנהל","שם עסק","כתובת","כתובת2","טלפון ראשי","טלפון2","טלפון3","תיאור סיווג","תפקיד","דואל","הודעה"' + "\r\n";
      // let csvContent = '"*","Creator","Created At","Status","Fullname","Phone Number","Email","Message"' + "\r\n";



      leads.forEach(lead => {
         let row = ('"' + lead._id + '","' + lead.creator + '","' + getTime(lead.createdAt) + '","' + t(lead.status) + '","' + lead.managerName + '","' + lead.businessName + '","' + lead.address + '","' + lead.address2 + '","' + lead.phoneNumber + '","' + lead.phoneNumber2 + '","' + lead.phoneNumber3 + '","' + lead.classDesc + '","' + lead.role + '","' + lead.email + '","' + lead.message + '"')
         csvContent += row + "\r\n";

      });


      var encodedUri = encodeURI(csvContent);

      var link = document.createElement("a");
      link.setAttribute("href", "data:text/csv;charset=utf-8,\uFEFF" + encodedUri);
      link.setAttribute("download", "leads.csv");
      link.click();

   }

   useEffect(() => {
      if (!user) {
         navigation('/')
         return
      }
      dispatch(loadLeads(user._id))
      dispatch(loadStatuses(user._id))
   }, [])

   const onRefreshLeads = async () => {
      await dispatch(loadLeads(user._id))
      await dispatch(loadStatuses(user._id))
      navigation('/lead')
   }


   const getTime = (timeStamp) => {
      const time = new Date(timeStamp)
      let hour = time.getHours();
      hour = ('0' + hour).slice(-2);
      let minute = time.getMinutes();
      minute = ('0' + minute).slice(-2);
      const timeToShow = time.getDate()

      // return `${hour}:${minute}`
      return `${time.toLocaleString()}`
   }

   const readExcel = async (file) => {
      const prm = new Promise((resolve, reject) => {
         const fileReader = new FileReader()
         fileReader.readAsArrayBuffer(file)

         fileReader.onload = (e) => {
            const bufferArray = e.target.result
            const wb = XLSX.read(bufferArray, { type: 'buffer' })
            const wsname = wb.SheetNames[0]
            const ws = wb.Sheets[wsname]
            const data = XLSX.utils.sheet_to_json(ws)
            addLeads(data)
            resolve(data)
         }
         fileReader.onerror = ((err) => {
            reject(err)
         }
         )
      })
      prm.then((d) => {
         // console.log(d)
      })
      setIsEdit(false)
   }

   const addLeads = async (leads) => {

      leads.forEach((lead, idx) => {
         const leadToSave = {
            managerName: lead[(t('Manager Name'))] || '',
            businessName: lead[(t('Business Name'))] || '',
            phoneNumber: lead[(t('Phone Number'))] || '',
            phoneNumber2: lead[(t('Phone Number2'))] || '',
            phoneNumber3: lead[(t('Phone Number3'))] || '',
            classDesc: lead[(t('Class Desc'))] || '',
            address: lead[(t('Address'))] || '',
            address2: lead[(t('Address2'))] || '',
            role: lead[(t('Role'))] || '',
            message: lead[(t('Message'))] || '',
            createdAt: Date.now(),
            email: lead[(t('Email'))] || '',
            status: lead[(t('Status'))] || 'New',
            creator: lead[(t('Creator'))] || user.fullname,
         }

         dispatch((saveLead(leadToSave)))
      })
   }


   const filterLeads = () => {
      if (user?._id) {
         loadLeads(user._id)
      }
      let filtered = leads
      if (filterBy.text) {
         filtered = filtered.filter((lead, idx) => {
            if ((lead.businessName + '')?.includes(filterBy.text) ||
               (lead.managerName + '')?.includes(filterBy.text) ||
               (lead.phoneNumber + '')?.includes(filterBy.text) ||
               (lead.phoneNumber2 + '')?.includes(filterBy.text) ||
               (lead.phoneNumber3 + '')?.includes(filterBy.text) ||
               (lead.address + '')?.includes(filterBy.text) ||
               (lead.address2 + '')?.includes(filterBy.text) ||
               (lead.role + '')?.includes(filterBy.text) ||
               (lead.message + '')?.includes(filterBy.text)
            ) {
               return lead
            }
         })
      }
      if (filterBy.status.length) {
         filtered = filtered.filter((lead, idx) => {
            if (filterBy.status.includes(t(lead.status))) return lead
         })
      }
      if (filterBy.campaign.length) {
         filtered = filtered.filter((lead, idx) => {
            if (filterBy.campaign.includes(lead.campaign)) return lead
         })

      }
      if (filterBy.channel.length) {
         filtered = filtered.filter((lead, idx) => {
            if (filterBy.channel.includes(lead.channel)) return lead
         })

      }
      if (filterBy.date) {
         filtered = filtered.filter((lead, idx) => {
            var date = new Date(lead.createdAt);
            var month = date.getMonth() + 1
            if (month < 10) {
               month = '0' + (month + 10)
            }
            var dateString = (date.getYear() + 1900) + '-' + +month + '-' + date.getDate()
            if (dateString === filterBy.date) return lead
         })
      }
      if (filterBy.creator.length) {
         filtered = filtered.filter((lead, idx) => {
            if (filterBy.creator.includes(lead.creator)) return lead
         })
      }
      setLeadsToShow(filtered)
   }

   if (!user) return (
      <section className='lead-app'>
         <h1 className='title'>{t('Please login to see your leads')}</h1>
      </section>
   )

   // if(isEditStatuses) return (
   //    <StatusesEdit />
   // )

   else return (
      <section className='lead-app'>
         <LeadFilter filterBy={filterBy} leads={leads} user={user} users={users} campaigns={campaigns} statuses={statuses} />

         {isEditStatuses && <StatusesApp setIsEditStatuses={setIsEditStatuses} isEditStatuses={isEditStatuses} />}
         <div className='flex align-center space-between' style={{ gap: '10px', marginBottom: '5px' }}>
            <div className='flex align-center'>

               <button className='exp-btn' onClick={() => editStatuses()}>{t('Edit Statuses')}</button>
               <button className='add-btn' onClick={() => setIsEdit(true)}>{t('Add a single lead')}</button>


               <form>
                  <div className='file'>
                     <label htmlFor='files' className="btn">{t('Import multiple leads')}</label>
                     <input id="files" type="file" accept={".xlsx"} onChange={(e) => {
                        const file = e.target.files[0]
                        readExcel(file)
                     }} />
                  </div>
               </form>
               <button className='exp-btn' onClick={() => exportLeads()}>{t('Export Leads')}</button>

               <h1 className='title' style={{ margin: '0' }}>{t('Total Leads')}: {leads.length}</h1>
               <h1 className='title' style={{ margin: '0' }}>{t('Chosen')}: {leadsToShow.length}</h1>
            </div>
            <button className='refresh-btn' onClick={() => { onRefreshLeads() }}>{t('Refresh')}</button>
         </div>
         {(isEdit) && <LeadEdit setIsEdit={setIsEdit} />}
         {/* <LeadsTablePagination leads={leads} /> */}

         <div className='lead-table'>
            <LeadTable leadsToShow={leadsToShow} leads={leads} setIsEdit={setIsEdit} filterBy={filterBy} />
            {/* <LeadList setIsEdit={setIsEdit} leads={leads} filterBy={filterBy} /> */}
         </div>

      </section>
   )

}