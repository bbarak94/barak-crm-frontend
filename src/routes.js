import { HomePage } from './pages/home-page'
import { LeadApp } from './pages/lead-app'
import { PrinterApp } from './pages/printer-app'
import { ZoneApp } from './pages/zone-app'
import { SettingsApp } from './pages/settings-app'
import { LoginSignup } from './pages/login-signup'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

const routes = [
   {
      path: '/',
      component: <HomePage />,
      label: 'Home',
   },
   {
      path: '/lead',
      component: <LeadApp />,
      label: 'Leads',
   },
   // {
   //    path: '/printer',
   //    component: <PrinterApp />,
   //    label: 'Printers',
   // },
   // {
   //    path: '/zones',
   //    component: <ZoneApp />,
   //    label: 'Zones',
   // },
   {
      path: '/settings',
      component: <SettingsApp />,
      label: 'Settings',
   },
   {
      path: '/login',
      component: <LoginSignup isSignup={false} />,
      label: 'Login',
   },
   {
      path: '/signup',
      component: <LoginSignup isSignup={true} />,
      label: 'Signup',
   },
]

export default routes;
