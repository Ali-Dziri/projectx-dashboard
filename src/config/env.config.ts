interface EnvConfig {
  API_BASE_URL: string;
  API_TIMEOUT: number;
  APP_NAME: string;
  APP_VERSION: string;
  ENVIRONMENT: "DEV" | "PROD";
  CSRF_TOKEN_KEY: string;
  ENABLE_DEBUG: boolean;
}

const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = import.meta.env[key] || defaultValue;

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
};
const parseBool = (value: string): boolean => {
  if (!value) return false;
  const parsed = import.meta.env[value];
  return parsed === "true";
};

export const env: EnvConfig = {
  API_BASE_URL: getEnvVar("VITE_API_BASE_URL"),
  API_TIMEOUT: parseInt(getEnvVar("VITE_API_TIMEOUT"), 10),
  APP_NAME: getEnvVar("VITE_APP_NAME"),
  APP_VERSION: getEnvVar("VITE_APP_VERSION"),
  ENVIRONMENT: getEnvVar("VITE_ENV") as EnvConfig["ENVIRONMENT"],
  CSRF_TOKEN_KEY: getEnvVar("VITE_CSRF_TOKEN_KEY"),
  ENABLE_DEBUG: parseBool("VITE_ENABLE_DEBUG"),
};

export const isDev = env.ENVIRONMENT === "DEV";
export const isProd = env.ENVIRONMENT === "PROD";

if (isDev) {
  console.log("🔧 Environment Configuration:", env);
}

export default env;
