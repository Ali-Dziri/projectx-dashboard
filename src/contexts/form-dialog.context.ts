import { createContext } from "react";

export type DialogContextType<T = unknown> = {
  isOpen: boolean;
  payload: T | null;
  openDialog: (data?: T) => void;
  closeDialog: () => void;
};

export const FormDialogContext = createContext<DialogContextType | null>(null);
