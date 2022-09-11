import { ZonesApp } from "../pages/zone-app"
import { ZonePreview } from './zone-preview.jsx'

export const ZoneList = ({ user, zones }) => {
   return <ul className="zone-list flex justify-center">
      {zones.map((zone, idx) => {
         return (
            <ZonePreview key={idx} idx={idx} user={user} zones={zones} zone={zone} />)
      })}
   </ul>
}
