import { Checkbox, FormControlLabel } from "@mui/material";

const OptionCheckBox = ({ label, selected, onSelect }) => {
  const handleChange = () => {
    if (!selected) onSelect();
  };
  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            checked={selected}
            onChange={handleChange}
            sx={{
              color: "#FFF582",
              "&.Mui-checked": { color: "#FFF582" },
            }}
          />
        }
        label={label}
      />
    </>
  );
};

export default OptionCheckBox;
