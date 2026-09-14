import {
  IconButton,
  ListItemIcon,
  ListItemText,
  useColorScheme,
} from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import Contrast from "@mui/icons-material/Contrast";
import Monitor from "@mui/icons-material/DesktopWindows";
import Moon from "@mui/icons-material/DarkMode";
import Sun from "@mui/icons-material/LightMode";
import Check from "@mui/icons-material/Check";
import { useTranslation } from "react-i18next";

type AppTheme = "system" | "dark" | "light";

const THEMES = [
  {
    value: "system",
    icon: <Monitor fontSize="small" />,
  },
  { value: "dark", icon: <Moon fontSize="small" /> },
  { value: "light", icon: <Sun fontSize="small" /> },
] as const;

export default function ThemeSwitcher() {
  const { mode, setMode } = useColorScheme();
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (theme: AppTheme) => {
    setMode(theme);
    handleClose();
  };

  return (
    <div>
      <IconButton
        aria-haspopup="true"
        aria-expanded={open}
        color="inherit"
        onClick={handleOpen}
      >
        <Contrast />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        slotProps={{
          paper: { className: "dark:bg-black!" },
        }}
      >
        {THEMES.map((th) => (
          <MenuItem
            key={th.value}
            selected={th.value === mode}
            onClick={() => handleSelect(th.value)}
          >
            <ListItemIcon>{th.icon}</ListItemIcon>
            <ListItemText
              slotProps={{
                primary: {
                  className: "flex! text-sm! items-center gap-4",
                },
              }}
            >
              {t(`header.themes.${th.value}`)}
              {th.value === mode && <Check fontSize="small" color="action" />}
            </ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
