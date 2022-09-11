
import { useEffect } from "react"

import { PrinterPreview } from "./printer-preview"

export const PrinterList = ({ onRefreshPrinters, printers, user }) => {

   if (!printers) return <h1></h1>

   else return (
      <ul className="printer-list flex justify-center">
         {printers.map((printer, idx) => {
            user?.activePrinters.map((p) => {
               if (p.id == printer.id) {
                  printer.isSelected = p.isSelected
                  printer.customName = p.customName
               }
            })
            return (<PrinterPreview key={idx} onRefreshPrinters={onRefreshPrinters} printer={printer} user={user} />)
         })}
      </ul>
   )
}