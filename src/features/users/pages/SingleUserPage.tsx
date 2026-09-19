import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetSingleUserQuery } from "../UsersService";
import { ApiErrorFallback } from "@/components/ErrorFallback";
import {
  CircularProgress,
  Avatar,
  IconButton,
  Tooltip,
  Paper,
  Divider,
} from "@mui/material";
import {
  Person,
  Email,
  Phone,
  LocationOn,
  Work,
  AccountBalance,
  CurrencyBitcoin,
  Computer,
  Security,
  FitnessCenter,
  ContentCopy,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { RoleChip } from "../components/RoleChip";

export default function SingleUserPage() {
  const { t } = useTranslation();
  const params = useParams();
  const id = params.id as string;

  const {
    data: user,
    isLoading,
    isError,
    refetch,
  } = useGetSingleUserQuery({ id });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );

  if (isError || !user)
    return (
      <div className="flex justify-center items-center h-screen">
        <ApiErrorFallback refetch={refetch} />
      </div>
    );

  const chips = [
    { icon: <Email fontSize="inherit" />, text: user.email },
    { icon: <Phone fontSize="inherit" />, text: user.phone },
    {
      icon: <LocationOn fontSize="inherit" />,
      text: `${user.address.city}, ${user.address.country}`,
    },
  ];

  return (
    <div className="min-h-screen p-4 md:p-8 mt-40">
      <div className="max-w-7xl mx-auto space-y-6">
        <Paper variant="outlined" className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Avatar
              src={user.image}
              alt={`${user.firstName} ${user.lastName}`}
              sx={{ width: 120, height: 120 }}
              className="border border-border-muted"
            />
            <div className="flex-1 text-center ltr:md:text-left rtl:md:text-right space-y-2">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <h2 className="text-2xl font-bold">
                  {user.firstName}{" "}
                  {user.maidenName ? `${user.maidenName} ` : ""}
                  {user.lastName}
                </h2>
                <RoleChip role={user.role} />
              </div>
              <p className="text-muted font-medium">
                {user.username} • {user.company.title}{" "}
                {t("single-user-page.ui.at")}{" "}
                <span className="text-primary">{user.company.name}</span>
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
                {chips.map((ch) => (
                  <span
                    key={ch.text}
                    className="flex items-center gap-1 text-xs bg-gray-200 dark:bg-gray-500/50 px-3 py-1.5 rounded-full"
                  >
                    {ch.icon} {ch.text}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Paper>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SectionCard
            title={t("single-user-page.sections.personalInformation")}
            icon={<Person className="text-blue-500 text-text-pr" />}
          >
            <InfoRow
              label={t("single-user-page.labels.fullName")}
              value={`${user.firstName} ${user.lastName}`}
            />
            <InfoRow
              label={t("single-user-page.labels.maidenName")}
              value={user.maidenName || t("single-user-page.ui.notAvailable")}
            />
            <InfoRow
              label={t("single-user-page.labels.gender")}
              value={user.gender}
            />
            <InfoRow
              label={t("single-user-page.labels.age")}
              value={`${user.age} ${t("single-user-page.ui.years")}`}
            />
            <InfoRow
              label={t("single-user-page.labels.birthDate")}
              value={user.birthDate}
            />
            <InfoRow
              label={t("single-user-page.labels.university")}
              value={user.university}
            />
          </SectionCard>

          <SectionCard
            title={t("single-user-page.sections.physicalAttributes")}
            icon={<FitnessCenter className="text-emerald-500" />}
          >
            <InfoRow
              label={t("single-user-page.labels.height")}
              value={`${user.height} ${t("single-user-page.ui.cm")}`}
            />
            <InfoRow
              label={t("single-user-page.labels.weight")}
              value={`${user.weight} ${t("single-user-page.ui.kg")}`}
            />
            <InfoRow
              label={t("single-user-page.labels.bloodGroup")}
              value={user.bloodGroup}
            />
            <InfoRow
              label={t("single-user-page.labels.eyeColor")}
              value={user.eyeColor}
            />
            <InfoRow
              label={t("single-user-page.labels.hairColor")}
              value={user.hair?.color}
            />
            <InfoRow
              label={t("single-user-page.labels.hairType")}
              value={user.hair?.type}
            />
          </SectionCard>

          <SectionCard
            title={t("single-user-page.sections.companyAndRole")}
            icon={<Work className="text-purple-500" />}
          >
            <InfoRow
              label={t("single-user-page.labels.companyName")}
              value={user.company?.name}
            />
            <InfoRow
              label={t("single-user-page.labels.department")}
              value={user.company?.department}
            />
            <InfoRow
              label={t("single-user-page.labels.jobTitle")}
              value={user.company?.title}
            />
            <Divider className="my-2!" />
            <InfoRow
              label={t("single-user-page.labels.companyAddress")}
              value={user.company?.address?.address}
            />
            <InfoRow
              label={t("single-user-page.labels.cityAndState")}
              value={`${user.company?.address?.city}, ${user.company?.address?.stateCode}`}
            />
            <InfoRow
              label={t("single-user-page.labels.country")}
              value={user.company?.address?.country}
            />
          </SectionCard>

          <SectionCard
            title={t("single-user-page.sections.homeAddress")}
            icon={<LocationOn className="text-red-500" />}
          >
            <InfoRow
              label={t("single-user-page.labels.streetAddress")}
              value={user.address?.address}
            />
            <InfoRow
              label={t("single-user-page.labels.city")}
              value={user.address?.city}
            />
            <InfoRow
              label={t("single-user-page.labels.state")}
              value={`${user.address?.state} (${user.address?.stateCode})`}
            />
            <InfoRow
              label={t("single-user-page.labels.postalCode")}
              value={user.address?.postalCode}
            />
            <InfoRow
              label={t("single-user-page.labels.country")}
              value={user.address?.country}
            />
            <InfoRow
              label={t("single-user-page.labels.coordinates")}
              value={`${user.address?.coordinates?.lat}, ${user.address?.coordinates?.lng}`}
            />
          </SectionCard>

          <SectionCard
            title={t("single-user-page.sections.financialInfo")}
            icon={<AccountBalance className="text-amber-500" />}
          >
            <InfoRow
              label={t("single-user-page.labels.cardType")}
              value={user.bank?.cardType}
            />
            <InfoRow
              label={t("single-user-page.labels.cardNumber")}
              value={`•••• •••• •••• ${user.bank?.cardNumber?.slice(-4)}`}
              copyable={false}
            />
            <InfoRow
              label={t("single-user-page.labels.expires")}
              value={user.bank?.cardExpire}
            />
            <InfoRow
              label={t("single-user-page.labels.currency")}
              value={user.bank?.currency}
            />
            <InfoRow
              label={t("single-user-page.labels.iban")}
              value={user.bank?.iban}
              copyable
            />
          </SectionCard>

          <SectionCard
            title={t("single-user-page.sections.cryptoAssets")}
            icon={<CurrencyBitcoin className="text-orange-500" />}
          >
            <InfoRow
              label={t("single-user-page.labels.coin")}
              value={user.crypto?.coin}
            />
            <InfoRow
              label={t("single-user-page.labels.network")}
              value={user.crypto?.network}
            />
            <InfoRow
              label={t("single-user-page.labels.walletAddress")}
              value={user.crypto?.wallet}
              copyable
            />
          </SectionCard>

          <SectionCard
            title={t("single-user-page.sections.identityAndSecurity")}
            icon={<Security className="text-teal-500" />}
          >
            <InfoRow
              label={t("single-user-page.labels.ssn")}
              value={user.ssn}
              copyable
            />
            <InfoRow
              label={t("single-user-page.labels.ein")}
              value={user.ein}
              copyable
            />
            <InfoRow
              label={t("single-user-page.labels.username")}
              value={user.username}
            />
            <InfoRow
              label={t("single-user-page.labels.role")}
              value={user.role}
            />
          </SectionCard>

          <SectionCard
            title={t("single-user-page.sections.technicalSpecs")}
            icon={<Computer className="text-indigo-500" />}
          >
            <InfoRow
              label={t("single-user-page.labels.ipAddress")}
              value={user.ip}
              copyable
            />
            <InfoRow
              label={t("single-user-page.labels.macAddress")}
              value={user.macAddress}
              copyable
            />
            <div className="pt-2">
              <span className="text-sm text-muted block mb-1">
                {t("single-user-page.labels.userAgent")}
              </span>
              <p className="text-xs break-all p-2 rounded text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-gray-800">
                {user.userAgent}
              </p>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

const InfoRow = ({
  label,
  value,
  copyable,
}: {
  label: string;
  value: React.ReactNode;
  copyable?: boolean;
}) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center justify-between py-2 border-b border-border-muted last:border-b-0">
      <div className="flex items-center space-x-2 text-muted text-sm">
        <span>{label}</span>
      </div>
      <div className="flex items-center space-x-1 font-medium text-sm text-right">
        <span className="text-wrap wrap-anywhere">
          {value || t("single-user-page.ui.notAvailable")}
        </span>
        {copyable && typeof value === "string" && (
          <Tooltip
            title={
              copied
                ? t("single-user-page.ui.copied")
                : t("single-user-page.ui.copy")
            }
          >
            <IconButton size="small" onClick={() => handleCopy(value)}>
              <ContentCopy fontSize="inherit" />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

const SectionCard = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <Paper variant="outlined" className="p-5">
    <div className="flex items-center space-x-2 mb-4 pb-2">
      {icon}
      <h3 className="text-lg font-semibold tracking-wide">{title}</h3>
    </div>
    <div className="space-y-1">{children}</div>
  </Paper>
);
