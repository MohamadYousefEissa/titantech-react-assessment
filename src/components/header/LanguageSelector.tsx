import { LOCALES_DATA } from "@/data/constant";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Check from "@mui/icons-material/Check";
import { IconButton, Tooltip } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";

export default function LanguageSelector() {
  const { i18n, t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (code: string) => {
    i18n.changeLanguage(code);
    handleClose();
  };

  return (
    <div>
      <Tooltip title={t("header.language")}>
        <IconButton
          aria-haspopup="true"
          aria-expanded={open}
          color="inherit"
          onClick={handleOpen}
        >
          <LanguageIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
        {LOCALES_DATA.map((loc) => (
          <MenuItem
            key={loc.code}
            selected={loc.code === i18n.language}
            onClick={() => handleSelect(loc.code)}
          >
            <div className="flex text-sm! items-center gap-4">
              {loc.label}
              {loc.code === i18n.language && (
                <Check color="action" style={{ fontSize: "16px" }} />
              )}
            </div>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
