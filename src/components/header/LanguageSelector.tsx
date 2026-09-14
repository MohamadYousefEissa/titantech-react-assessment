import { LOCALES_DATA } from "@/data/constant";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Check from "@mui/icons-material/Check";

export default function LanguageSelector() {
  const { i18n } = useTranslation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const selectedLocale =
    LOCALES_DATA.find((loc) => loc.code === i18n.language) || LOCALES_DATA[0];

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
      <Button
        aria-haspopup="true"
        aria-expanded={open}
        color="inherit"
        style={{ textTransform: "none" }}
        endIcon={
          <KeyboardArrowDownIcon
            className={`transition-transform! duration-200 ${open ? "rotate-180" : ""}`}
          />
        }
        onClick={handleOpen}
      >
        {selectedLocale.label}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        slotProps={{
          paper: { className: "dark:bg-black!" },
        }}
      >
        {LOCALES_DATA.map((loc) => (
          <MenuItem
            key={loc.code}
            selected={loc.code === i18n.language}
            onClick={() => handleSelect(loc.code)}
          >
            <div className="flex text-sm! items-center gap-4">
              {loc.label}
              {loc.code === i18n.language && (
                <Check fontSize="small" color="action" />
              )}
            </div>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
