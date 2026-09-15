import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export const ProductSearchInput = () => {
  return (
    <TextField
      id="outlined-basic"
      placeholder="Outlined"
      variant="outlined"
      className="w-full"
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        },
      }}
    />
  );
};
