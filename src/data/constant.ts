export const LOCALES = {
  ar: "ar",
  en: "en",
} as const;

export const LOCALES_DATA = [
  { label: "English", code: LOCALES.en },
  { label: "العربية", code: LOCALES.ar },
] as const;

export const TOKEN_KEYS = {
  access: "accessToken",
  refresh: "refreshToken",
} as const;

export const DEFAULT_ERROR_MESSAGE = "An unknown error occurred";
