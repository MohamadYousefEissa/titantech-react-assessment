import { IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useTranslation } from "react-i18next";

export const UserSearchInput = ({
  setInputValue,
}: {
  setInputValue: Dispatch<SetStateAction<string>>;
}) => {
  const { t } = useTranslation();

  const timerRef = useRef<NodeJS.Timeout>(null);
  const [localValue, setLocalValue] = useState("");

  const handleChangeValue = (ev: ChangeEvent<HTMLInputElement>) => {
    const newValue = ev.target.value;
    setLocalValue(newValue);

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setInputValue(newValue);
    }, 700);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const clearInput = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setLocalValue("");
    setInputValue("");
  };

  return (
    <TextField
      id="search-users-input"
      aria-label="search for users"
      placeholder={t("users-page.search-input.placeholder")}
      variant="outlined"
      autoComplete="off"
      size="small"
      value={localValue}
      onChange={handleChangeValue}
      className="w-full sm:w-80"
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: localValue.length > 0 && (
            <InputAdornment position="end">
              <IconButton size="small" onClick={clearInput}>
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};
