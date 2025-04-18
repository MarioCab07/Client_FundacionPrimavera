import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const BasicSelect = ({options , value,setValue,label})=> {


    const handleChange = (event) => {
    setValue(event.target.value);
    };

    return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="select-label">{label}</InputLabel>
        <Select
          labelId="select-label"
          id="select"
          value={value}
          label={label}
          onChange={handleChange}
        >
            {options.map((opt)=>{
                return <MenuItem key={opt} value={opt}>{opt}</MenuItem>
            })}
        </Select>
      </FormControl>
    </Box>
  );
}


export default BasicSelect;