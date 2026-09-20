import type { UserRole } from "@/@types/user";
import { AdminPanelSettings } from "@mui/icons-material";
import { Chip } from "@mui/material";
import { useTranslation } from "react-i18next";

const roleColorMap: Record<UserRole, "warning" | "primary" | "default"> = {
  admin: "warning",
  moderator: "primary",
  user: "default",
};

export const RoleChip = ({ role }: { role: UserRole }) => {
  const { t } = useTranslation();

  return (
    <Chip
      variant="outlined"
      label={t(`roles.${role}`)}
      color={roleColorMap[role] || "default"}
      size="small"
      icon={<AdminPanelSettings fontSize="small" />}
      className="font-medium"
    />
  );
};
