import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';

import { loadLeads, saveLead } from '../store/actions/lead.action'
import { setLoadingOff, setLoadingOn } from '../store/actions/system.action'
import { userService } from '../services/user.service'

import { LeadEdit } from '../cmps/lead-edit'
import { LeadTable } from '../cmps/lead-table'

import { StatusesApp } from '../cmps/statuses-app.jsx'


import * as XLSX from 'xlsx'
import { loadStatuses } from '../store/actions/status.action';
import { useEffectUpdate } from '../hooks/useEffectUpdate';
import { LeadFilter } from '../cmps/lead-filter'

import { Audio } from 'react-loader-spinner'
import { Loader } from '../cmps/loader'


export const LeadApp = () => {
   const navigation = useNavigate()
   const dispatch = useDispatch()
   const { t, i18n } = useTranslation();
   const { leads } = useSelector((storeState) => storeState.leadModule)
   const { statuses } = useSelector((storeState) => storeState.statusModule)
   const { filterBy } = useSelector((storeState) => storeState.leadModule)
   const { users } = useSelector((storeState) => storeState.userModule)
   const { campaigns } = useSelector((storeState) => storeState.campaignModule)
   const { isLoading } = useSelector((storeState) => storeState.systemModule)

   const user = userService.getLoggedinUser()
   const [leadsToShow, setLeadsToShow] = useState(leads)


   const [isEdit, setIsEdit] = useState(false)
   const [isEditStatuses, setIsEditStatuses] = useState(false)
   const [isEditFields, setIsEditFields] = useState(false)
   const [fields, setFields] = useState([])
   const [connectedFields, setConnectedFields] = useState({ קמפיין: 'קבצי דטא', ערוץ: 'קובץ 1' })
   const [data, setData] = useState([])
   const appFields = [
      { fieldName: 'ID', fieldProp: '_id' },
      { fieldName: 'Manager Name', fieldProp: 'managerName' },
      { fieldName: 'Business Name', fieldProp: 'businessName' },
      { fieldName: 'Phone Number', fieldProp: 'phoneNumber' },
      { fieldName: 'Phone Number2', fieldProp: 'phoneNumber2' },
      { fieldName: 'Phone Number3', fieldProp: 'phoneNumber3' },
      { fieldName: 'Class Desc', fieldProp: 'classDesc' },
      { fieldName: 'Address', fieldProp: 'address' },
      { fieldName: 'Address2', fieldProp: 'address2' },
      { fieldName: 'Role', fieldProp: 'role' },
      { fieldName: 'Message', fieldProp: 'message' },
      { fieldName: 'Created at', fieldProp: 'createdAt' },
      { fieldName: 'Email', fieldProp: 'email' },
      { fieldName: 'Status', fieldProp: 'status' },
      { fieldName: 'Creator', fieldProp: 'creator' },

   ]

   useEffect(() => {
      if (!user) {
         navigation('/')
         return
      }
      dispatch(loadStatuses(user._id))
      dispatch(loadLeads(user._id))
   }, [])


   useEffectUpdate(() => {
      filterLeads()
      loadLeads(user?._id)
      // loadStatuses(user?._id)
      dispatch(loadStatuses(user._id))
   }, [leads, filterBy])

   // useEffect(() => {
   //    filterLeads()
   //    loadStatuses(user?._id)
   // }, [filterBy])

   // useEffect(() => {
   //    loadLeads(user?._id)
   //    loadStatuses(user._id)
   // }, [leads])

   useEffectUpdate(async () => {
      await loadLeads(user._id)
      loadStatuses(user._id)
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


   const onRefreshLeads = async () => {
      console.log('test')
      console.log('isLoading:', isLoading)
      if (isLoading) { dispatch(setLoadingOff()) } else { dispatch(setLoadingOn()) }
      await dispatch(loadLeads(user._id))
      await dispatch(loadStatuses(user._id))
      navigation('/lead')
   }


   const importLeads = async (ev) => {
      ev.preventDefault()
      debugger
      await dispatch(setLoadingOn())
      await addLeads(data)
      await setIsEditFields(false)
      await dispatch(setLoadingOff())
   }



   const handleChange = (ev) => {
      const newFields = { ...connectedFields }
      if (ev.target.name === 'channel') {
         newFields[t('Campaign')] = ev.target.value.split(',')[0]
         newFields[t('Channel')] = ev.target.value.split(',')[1]
      } else {
         newFields[ev.target.value] = ev.target.name
      }
      setConnectedFields(newFields)
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





            var sheet_name_list = wb.SheetNames;
            sheet_name_list.forEach(function (y) {
               var worksheet = wb.Sheets[y];
               var headers = {};
               var data = [];
               for (let z in worksheet) {
                  if (z[0] === '!') continue;
                  //parse out the column, row, and value
                  var tt = 0;
                  for (var i = 0; i < z.length; i++) {
                     if (!isNaN(z[i])) {
                        tt = i;
                        break;
                     }
                  };
                  var col = z.substring(0, tt);
                  var row = parseInt(z.substring(tt));
                  var value = worksheet[z].v;

                  //store header names
                  if (row == 1 && value) {
                     headers[col] = value;

                     continue;
                  }

                  if (!data[row]) data[row] = {};
                  data[row][headers[col]] = value;
               }
               var headersArr = []
               for (const [key, value] of Object.entries(headers)) {
                  headersArr.push(value)

               }
               setIsEditFields(true)
               setFields(headersArr)
               //drop those first two rows which are empty
               data.shift();
               data.shift();
            });
            setData(data)
            // addLeads(data)
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

      await leads.forEach((lead, idx) => {
         const leadToSave = {
            managerName: lead[connectedFields[t('Manager Name')]] || '',
            businessName: lead[connectedFields[t('Business Name')]] || '',
            phoneNumber: lead[connectedFields[t('Phone Number')]] || '',
            phoneNumber2: lead[connectedFields[t('Phone Number2')]] || '',
            phoneNumber3: lead[connectedFields[t('Phone Number3')]] || '',
            classDesc: lead[connectedFields[t('Class Desc')]] || '',
            address: lead[connectedFields[t('Address')]] || '',
            address2: lead[connectedFields[t('Address2')]] || '',
            role: lead[connectedFields[t('Role')]] || '',
            message: lead[connectedFields[t('Message')]] || '',
            createdAt: Date.now(),
            email: lead[connectedFields[t('Email')]] || '',
            status: lead[connectedFields[t('Status')]] || 'New',
            creator: lead[connectedFields[t('Creator')]] || user.fullname
         }
         leadToSave.campaign = connectedFields[t('Campaign')]
         leadToSave.channel = connectedFields[t('Channel')]

         dispatch((saveLead(leadToSave)))
      })
      await dispatch(setLoadingOff())
   }


   const filterLeads = () => {
      if (user?._id) {
         loadLeads(user._id)
         loadStatuses(user._id)

      }
      let filtered = leads
      if (filterBy.text) {
         filtered = filtered.filter((lead, idx) => {
            if ((lead.businessName + '')?.includes(filterBy.text) ||
               (lead.managerName + '')?.includes(filterBy.text) ||
               (lead.phoneNumber + '').replace('-', '')?.includes(filterBy.text) ||
               (lead.phoneNumber2 + '').replace('-', '')?.includes(filterBy.text) ||
               (lead.phoneNumber3 + '').replace('-', '')?.includes(filterBy.text) ||
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
      if (!user.isAdmin) {
         filtered = filtered.filter((lead, idx) => {
            if (lead.creator === user.fullname) return lead
         })
      }
      setLeadsToShow(filtered)
   }

   if (!user) return (
      <section className='lead-app'>
         <h1 className='title'>{t('Please login to see your leads')}</h1>
      </section>
   )


   else return (
      <section className='lead-app'>
         {isLoading && <Loader
            height="80"
            width="80"
            radius="9"
            color='green'
            ariaLabel='three-dots-loading'
            wrapperStyle
            wrapperClass
         />}
         <LeadFilter filterBy={filterBy} leads={leads} user={user} users={users} campaigns={campaigns} statuses={statuses} />
         <div>

            {isEditStatuses && <StatusesApp setIsEditStatuses={setIsEditStatuses} isEditStatuses={isEditStatuses} />}
            {isEditFields && (
               <div className='edit-fields'>
                  <form>
                     <div className='edit-field'>
                        <h2>{t('Channel')} :</h2>
                        <select onChange={handleChange} name={'channel'}>
                           {campaigns.map((c, idx) => {
                              return c.channels.map((ch, idxx) => {
                                 if (t(ch.channelType) === t('Excel channel')) {
                                    return (<option key={idxx} value={[c.campaignName, ch.channelName]} >{ch.channelName}</option>)
                                 }
                              })
                           })}

                        </select>
                     </div>

                     {fields.map((f, idx) => {
                        return (<div className='edit-field' key={idx}>
                           <h2>{f}:</h2>
                           <select key={idx} onChange={handleChange} name={f}>
                              <option value='' >{t('Remove Field')}</option>
                              {appFields.map((appField, idxx) => {
                                 return <option key={idxx} value={appField.Prop}>{t(appField.fieldName)}</option>
                              })}
                           </select>
                        </div>)

                     })}
                     <button onClick={importLeads}>{t('Import')}</button>
                  </form>
               </div>
            )
            }
            <div className='flex align-center space-between' style={{ gap: '10px', marginBottom: '5px' }}>
               <div className='flex align-center'>
                  {user.isAdmin && <button className='exp-btn' onClick={() => editStatuses()}>{t('Edit Statuses')}</button>}
                  <button className='add-btn' onClick={() => setIsEdit(true)}>{t('Add a single lead')}</button>
                  {user.isAdmin && <form>
                     <div className='file'>
                        <label htmlFor='files' className="btn">{t('Import multiple leads')}</label>
                        <input id="files" type="file" accept={".xlsx"} onChange={(e) => {
                           const file = e.target.files[0]
                           readExcel(file)
                        }} />
                     </div>
                  </form>}
                  <button className='exp-btn' onClick={() => exportLeads()}>{t('Export Leads')}</button>
                  <h1 className='title' style={{ margin: '0' }}>{t('Total Leads')}: {leads.length}</h1>
                  {(leads.length > leadsToShow.length) && (
                     <h1 className='title' style={{ margin: '0' }}>{t('After filter')}: {leadsToShow.length}</h1>
                  )}
               </div>
               <button className='refresh-btn' onClick={() => { onRefreshLeads() }}>{t('Refresh')}</button>
            </div>
            {(isEdit) && <LeadEdit setIsEdit={setIsEdit} />}
            <div className='lead-table'>
               <LeadTable statuses={statuses} leadsToShow={leadsToShow} leads={leads} setIsEdit={setIsEdit} filterBy={filterBy} />
               {/* <LeadList setIsEdit={setIsEdit} leads={leads} filterBy={filterBy} /> */}
            </div>
         </div>

      </section>
   )

}