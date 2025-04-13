import { Checkbox,FormControlLabel } from "@mui/material";

const CheckboxValue = ({ checked, setChecked, label }) => {

    const handleChecked = (e)=>{
        setChecked(e.target.checked);
    }

    return (
        <FormControlLabel
            control={
                <Checkbox
                    checked={checked}
                    onChange={handleChecked}
                    
                    style={{color:"#FFF582"}}
                />
            }
            label={label} // Add your label text here
        />
    );
}

export default CheckboxValue;