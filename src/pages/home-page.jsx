import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';

import { InsightsApp } from '../cmps/insights-app.jsx'

import i18next from 'i18next'

export function HomePage() {
      const { t, i18n } = useTranslation()
      const navigation = useNavigate()

      const { user } = useSelector((storeState) => storeState.userModule)
      const { users } = useSelector((storeState) => storeState.userModule)
      const { leads } = useSelector((storeState) => storeState.leadModule)

      const [totalSales, setTotalSales] = useState(25534)
      const [totalLeads, setTotalLeads] = useState(984)
      const [totalClients, setTotalClients] = useState(65)

      useEffect(() => {
            // if (user) {
            //       setTotalLeads(leads.length)
            //       var sum = leads.reduce((acc, lead) => {
            //             return (+lead.totalPrice) + acc
            //       }, 0)
            //       setTotalSales(sum)
            //       setTotalLeads(leads.length)
            // }
            // if (users.length) {
            //       setTotalClients(users.length)
            // }

            // if (leads.length) {
            //       setTotalLeads(leads.length)
            //       setTotalClients(leads.length)
            // }
            i18next.changeLanguage('he')
            document.body.dir = 'RTL'
      }, [])

      const navLogin = () => {
            navigation('/login')
      }


      return (
            <section className='home-page flex column'>
                  <div className='main-text flex column align-center justify-center'>
                        <h1 className='title1'>{t('Smart tool for managing leads')}</h1>
                        <h2 className='title2'>{t('Click-In CRM is a decision support and management system for you leading managing system in your business,The system performs automation and customization for managing leads')}</h2>
                        <button onClick={navLogin}>{t('Start Now')}</button>
                  </div>
                  {/* <InsightsApp totalSales={totalSales} totalClients={totalClients} totalLeads={totalLeads} /> */}
            </section >
      )
}
