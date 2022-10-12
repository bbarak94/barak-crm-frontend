import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useEffectUpdate } from '../hooks/useEffectUpdate'
import { loadCampaigns, setCampaign } from '../store/actions/campaign.action'

import { setFilterBy } from "../store/actions/lead.action"


import MultipleSelectStatus from "./multiple-select-status";
import MultipleSelectUser from "./multiple-select-user";
import MultipleSelectCampaign from "./multiple-select-campaign";
import MultipleSelectChannel from "./multiple-select-channel";

export const LeadFilter = ({ filterBy, user, users }) => {
   const { t, i18n } = useTranslation();
   const navigation = useNavigate()
   const { campaigns } = useSelector((storeState) => storeState.campaignModule)
   const { statuses } = useSelector((storeState) => storeState.statusModule)

   const dispatch = useDispatch()




   const [text, setText] = useState(filterBy.text)
   const [date, setDate] = useState(filterBy.date)
   const [creator, setCreator] = useState([])
   const [status, setStatus] = useState([])
   const [campaign, setCampaign] = useState([])
   const [channel, setChannel] = useState([])



   useEffect(() => {
      if (!user) {
         navigation('/')
         return
      }
      dispatch(loadCampaigns(user._id))
   }, [])



   const handleChange = (ev, place = '') => {
      const field = ev.target?.name
      const value = ev.target?.value
      const newFilterBy = filterBy
      switch (field) {
         case 'creator':
            setCreator(value)
            break
         case 'text':
            setText(value)
            newFilterBy.text = value
            break
         case 'date':
            setDate(value)
            newFilterBy.date = value
            break
      }
      dispatch((setFilterBy(newFilterBy)))
   }

   const clearFilter = (ev) => {
      const newFilterBy = { date: '', text: '', status: '', creator: [], campaign: [], channel: [] }
      setText('')
      setDate('')
      setStatus([])
      setCreator([])
      setCampaign([])
      setChannel([])
      dispatch((setFilterBy(newFilterBy)))
   }

   return (
      <section className="lead-filter">
         <div className="flex column align-center">

            <h1>{t('Date')}:</h1>
            <input type="date" id="start" name='date' onChange={handleChange} value={date}>

            </input>
         </div>
         <div className="flex column align-center">

            <h1>{t('Search')}:</h1>
            <input type="text" value={text} onChange={handleChange} name='text'>
            </input>
         </div>
         <div className="flex column align-center">
            <h1>{t('Status')}:</h1>
            <MultipleSelectStatus status={status} setStatus={setStatus} statuses={statuses} />
         </div>
         <div className="flex column align-center">

            <h1>{t('Campaigns')}:</h1>
            <MultipleSelectCampaign filterBy={filterBy} campaign={campaign} setCampaign={setCampaign} campaigns={campaigns} />
         </div>
         <div className="flex column align-center">

            <h1>{t('Channels')}:</h1>
            <MultipleSelectChannel filterBy={filterBy} channel={channel} setChannel={setChannel} campaigns={campaigns} />
         </div>
         <div className="flex column align-center">

            <h1>{t('Creator')}:</h1>
            <MultipleSelectUser filterBy={filterBy} creator={creator} setCreator={setCreator} users={users} />
         </div>
         <button onClick={clearFilter}>
            {t('Clear filter')}
         </button>
      </section >

   )
}
