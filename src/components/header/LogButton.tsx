import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Link } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useState } from "react";
import { logout } from "@/features/auth/AuthSlice";

export const LogButton = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleConfirmLogout = () => {
    dispatch(logout());
    setOpen(false);
  };

  if (user)
    return (
      <>
        <Button
          onClick={handleOpen}
          variant="text"
          color="error"
          endIcon={<LogoutIcon className="rtl:rotate-180" />}
        >
          {t("header.logout")}
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="logout-dialog-title"
          aria-describedby="logout-dialog-description"
        >
          <DialogTitle id="logout-dialog-title">
            {t("logout-dialog.title")}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="logout-dialog-description">
              {t("logout-dialog.description")}
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ padding: 2 }}>
            <Button onClick={handleClose} color="inherit">
              {t("logout-dialog.cancel")}
            </Button>
            <Button
              onClick={handleConfirmLogout}
              color="error"
              variant="contained"
              autoFocus
            >
              {t("logout-dialog.logout")}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );

  return (
    <Button
      component={Link}
      to="/login"
      variant="outlined"
      endIcon={<LoginIcon className="rtl:rotate-180" />}
    >
      {t("header.login")}
    </Button>
  );
};
