import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';

import { loadLeads, saveLead } from '../store/actions/lead.action'
import { userService } from '../services/user.service'

import { InsightsApp } from '../cmps/insights-app'
import { LeadEdit } from '../cmps/lead-edit'
import { LeadList } from '../cmps/lead-list'

import * as XLSX from 'xlsx'

export const LeadApp = () => {
   const navigation = useNavigate()
   const dispatch = useDispatch()
   const { t, i18n } = useTranslation();
   const { leads } = useSelector((storeState) => storeState.leadModule)
   const user = userService.getLoggedinUser()

   const [isEdit, setIsEdit] = useState(false)




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
   }, [])

   const onRefreshLeads = async () => {
      await dispatch(loadLeads(user._id))
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

   const readExcel = (file) => {
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
            creator: lead[(t('Creator'))] || '',
         }

         dispatch((saveLead(leadToSave)))
      })
   }




   if (!user) return (
      <section className='lead-app'>
         <h1 className='title'>{t('Please login to see your leads')}</h1>
      </section>
   )



   else return (
      <section className='lead-app'>
         <div className='flex align-center space-between' style={{ gap: '10px', marginBottom: '5px' }}>
            <div className='flex align-center'>
               <button className='exp-btn' onClick={() => exportLeads()}>{t('Export Leads')}</button>


               <form>
                  <div className='file'>
                     <label htmlFor='files' className="btn">{t('Import XLSX')}</label>
                     <input id="files" type="file" accept={".xlsx"} onChange={(e) => {
                        const file = e.target.files[0]
                        readExcel(file)
                     }} />
                  </div>
               </form>
               <button className='add-btn' onClick={() => setIsEdit(true)}>{t('Add Lead')}</button>
               <h1 className='title' style={{ margin: '0' }}>{t('Leads Count')}: {leads.length}</h1>
            </div>
            <button className='refresh-btn' onClick={() => { onRefreshLeads() }}>{t('Refresh')}</button>
         </div>
         {(isEdit) && <LeadEdit setIsEdit={setIsEdit} />}
         <div className='lead-table'>
            <LeadList setIsEdit={setIsEdit} leads={leads} />
         </div>
      </section>
   )

}