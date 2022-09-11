import React from 'react'
import { useTranslation } from 'react-i18next';

export const AppFooter = () => {
   const { t, i18n } = useTranslation();

   return (
      <footer className="app-footer">
         <p>
            {t('Copyrights - Barak Braun')}
         </p>
      </footer>
   )
}