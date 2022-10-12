
import * as React from 'react';
import { useDispatch, useSelector } from "react-redux"

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useTranslation } from 'react-i18next';
import { leadService } from '../services/lead.service';
import { removeLead, setLead, saveLead, loadLeads, getActionSetLead } from "../store/actions/lead.action"

const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: 400,
   bgcolor: 'background.paper',
   border: '2px solid #000',
   boxShadow: 24,
   p: 4,
};
export const CreatorModal = ({ selectedLeads }) => {
   const { t, i18n } = useTranslation();
  const { user, users } = useSelector((storeState) => storeState.userModule)

   const dispatch = useDispatch()

   const [open, setOpen] = React.useState(true);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);




   const handleChange = async (ev) => {
      const field = ev.target?.name
      const value = ev.target?.value
      selectedLeads.map(async(id,idx)=>{
         const newLead = await leadService.getById(id)
         newLead.creator = value
         await dispatch((saveLead(newLead)))
      })
    }


   return (
      <div>
         {/* <Button onClick={handleOpen}>Open modal</Button> */}
         <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
         >
            <Box sx={style}>
               <select name='creator' onChange={(ev) => { handleChange(ev) }}>
                  {users.map((user, idx) => {
                     return (<option key={idx} value={user.fullname} >{user.fullname}</option>)
                  })}
               </select>
            <button>{t('Edit all')}</button>
            </Box>
         </Modal>
      </div>
   );
}