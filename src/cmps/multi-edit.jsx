import * as React from 'react';
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { useTranslation } from 'react-i18next';
import { leadService } from '../services/lead.service';
import { removeLead, setLead, saveLead, loadLeads, getActionSetLead } from "../store/actions/lead.action"

import { StatusModal } from './status-modal';
import { CreatorModal } from './creator-modal';


export const MultiEdit = ({ selectedLeads }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch()

  const ITEM_HEIGHT = 48;


  const [isEditStatus, setIsEditStatus] = useState(false)
  const [isEditCreator, setIsEditCreator] = useState(false)

  const options = [
    t('Change status'),
    t('Change creator'),
    t('Reset creator')
  ];
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleChange = (ev, option) => {

    switch (ev.target.textContent) {
      case t('Change status'):
        setIsEditStatus(true)
        break
      case t('Change creator'):
        setIsEditCreator(true)
        break
      case t('Reset creator'):
        resetCreator()
        break
    }
  }

  const resetCreator = async (ev) => {
    selectedLeads.map(async(id,idx)=>{
      const newLead = await leadService.getById(id)
      newLead.creator = "Admin"
      await dispatch((saveLead(newLead)))
   })

  }


  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>

      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} selected={option === 'Pyxis'} onClick={(ev, option) => { handleChange(ev, option) }}>
            {option}
          </MenuItem>
        ))}
      </Menu>
      {isEditStatus && (
        <StatusModal selectedLeads={selectedLeads}></StatusModal>
      )}
      {isEditCreator && (

        <CreatorModal selectedLeads={selectedLeads}></CreatorModal>
      )}
    </div>
  );
}
