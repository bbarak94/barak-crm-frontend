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

function getStyles(name, status, theme) {
  return {
    fontWeight:
      status.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectStatus({ status, setStatus, statuses }) {
  const filterBy = useSelector((storeState) => storeState.leadModule.filterBy)

  const names = []
  statuses.forEach(s => {
    names.push(s.statusName)
  })
  const dispatch = useDispatch()
  const theme = useTheme();


  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    var newStatus = status
    if (status.includes(value + '')) {
      newStatus.splice([status.indexOf(value)])
    } else {
      newStatus = value
    }

    setStatus(
      // On autofill we get a stringified value.
      newStatus
    );

    const newFilterBy = filterBy
    newFilterBy.status = newStatus    
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
          value={status}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {names.map((name, idx) => (
            <MenuItem
              key={idx}
              value={name}
              style={getStyles(name, status, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
