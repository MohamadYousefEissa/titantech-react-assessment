import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  useColorScheme,
} from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import Palette from "@mui/icons-material/Palette";
import Monitor from "@mui/icons-material/DesktopWindows";
import Moon from "@mui/icons-material/DarkMode";
import Sun from "@mui/icons-material/LightMode";
import Check from "@mui/icons-material/Check";
import { useTranslation } from "react-i18next";

type AppTheme = "system" | "dark" | "light";

const THEMES = [
  {
    value: "system",
    icon: <Monitor style={{ fontSize: "20px" }} />,
  },
  { value: "dark", icon: <Moon style={{ fontSize: "20px" }} /> },
  { value: "light", icon: <Sun style={{ fontSize: "20px" }} /> },
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
      <Tooltip title={t("header.theme")}>
        <IconButton
          aria-haspopup="true"
          aria-expanded={open}
          color="inherit"
          onClick={handleOpen}
        >
          <Palette fontSize="small" />
        </IconButton>
      </Tooltip>

      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
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
              {th.value === mode && (
                <Check color="action" style={{ fontSize: "16px" }} />
              )}
            </ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
