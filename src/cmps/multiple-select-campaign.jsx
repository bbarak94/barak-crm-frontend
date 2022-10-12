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

function getStyles(name, campaign, theme) {
  return {
    fontWeight:
      campaign.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectCampaign({ filterBy, setCampaign, campaign, campaigns }) {
  const names = []
  campaigns.forEach(c => {
    names.push(c.campaignName)
  })
  const dispatch = useDispatch()

  const theme = useTheme();


  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    var newCampaign = campaign
    if (campaign.includes(value + '')) {
      newCampaign.splice([campaign.indexOf(value)])
    } else {
      newCampaign = value
    }

    setCampaign(
      // On autofill we get a stringified value.
      newCampaign
    );
    const newFilterBy = filterBy
    newFilterBy.campaign = newCampaign
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
          value={campaign}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {names.map((name, idx) => (
            <MenuItem
              key={idx}
              value={name}
              style={getStyles(name, campaign, theme)}
            >
              {name}
            </MenuItem>
          ))}

        </Select>
      </FormControl>
    </div>
  );
}
