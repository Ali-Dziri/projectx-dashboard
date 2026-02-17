export type Theme = "light" | "dark" | "system";

export type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export type FormDialogProviderState = {
  open: boolean;
  setOpen: (open: boolean) => void;
};
