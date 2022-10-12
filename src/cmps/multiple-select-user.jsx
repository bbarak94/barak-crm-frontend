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

function getStyles(name, creator, theme) {
  return {
    fontWeight:
    creator.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectUser({filterBy, creator, setCreator, users}) {

  const names = []
  users.forEach(u => {
    names.push(u.fullname)
  })
  const dispatch = useDispatch()

  const theme = useTheme();
  // const [creator, setCreator] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    var newCreator = creator
    if (creator.includes(value)) {
      newCreator.splice([creator.indexOf(value)])
    } else {
      newCreator = value
    }

    setCreator(
      // On autofill we get a stringified value.
      newCreator
    );
    const newFilterBy = filterBy
    newFilterBy.creator = newCreator
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
          value={creator}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {names.map((name,idx) => (
            <MenuItem
              key={idx}
              value={name}
              style={getStyles(name, creator, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
