import * as React from 'react';
import { useSelector, useDispatch } from "react-redux";

import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { setFilterBy } from "../store/actions/lead.action"


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, channel, theme) {
  return {
    fontWeight:
      channel.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChannel({ filterBy, setChannel, channel, campaigns }) {
  const names = []
  campaigns.forEach(c => {
   console.log('c:',c)
   
   if(c.channels?.length) {

      c.channels.map((cha,idx)=>{
         console.log('cha:',cha)         
         names.push(cha.channelName)

      })

   }
   //  names.push(c.campaignName)
  })
  console.log('names:',names)
  
  const dispatch = useDispatch()

  const theme = useTheme();


  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    var newChannel = channel
    if (channel.includes(value + '')) {
      newChannel.splice([channel.indexOf(value)])
    } else {
      newChannel = value
    }

    setChannel(
      // On autofill we get a stringified value.
      newChannel
    );
    const newFilterBy = filterBy
    newFilterBy.channel = newChannel
    dispatch((setFilterBy(newFilterBy)))
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Name</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={channel}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
        {console.log(names)}
          {names.map((name, idx) => (
            <MenuItem
              key={idx}
              value={name}
              style={getStyles(name, channel, theme)}
            >
              {name}
            </MenuItem>
          ))}

        </Select>
      </FormControl>
    </div>
  );
}
