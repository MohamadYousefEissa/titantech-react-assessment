import { PreferenceContext, type Gender } from "@/contexts/preference-context";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext, useEffect, useState } from "react";

export const PreferenceDialog = () => {
  const [open, setOpen] = useState(false);
  const [gender, setGender] = useState("");
  const { setData } = useContext(PreferenceContext);

  useEffect(() => {
    const hasConfigured = localStorage.getItem("hasSetPreference");
    if (!hasConfigured) {
      const timer = setTimeout(() => {
        setOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("userGender", gender);
    localStorage.setItem("hasSetPreference", "true");
    setData({ gender: gender as Gender, hasSetPreference: true });
    setOpen(false);
  };

  const handleSkip = () => {
    localStorage.setItem("hasSetPreference", "true");
    setData({ gender: gender as Gender, hasSetPreference: true });
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="preference-dialog-title"
      aria-describedby="preference-dialog-description"
      role="dialog"
    >
      <DialogTitle id="preference-dialog-title">
        Tailor Your Experience
      </DialogTitle>

      <DialogContent>
        <DialogContentText id="preference-dialog-description">
          Select your preference so we can surface the most relevant content for
          you.
        </DialogContentText>

        <div className="mt-4">
          <FormControl component="fieldset" fullWidth>
            <FormLabel id="gender-label">Preference</FormLabel>
            <RadioGroup
              row
              aria-labelledby="gender-label"
              name="gender-preference-group"
              value={gender}
              onChange={(ev) => setGender(ev.target.value)}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
          </FormControl>
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleSkip} color="inherit">
          Skip
        </Button>
        <Button onClick={handleSave} variant="contained" disabled={!gender}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
