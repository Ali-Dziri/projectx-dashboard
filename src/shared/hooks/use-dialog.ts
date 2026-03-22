import { useContext } from "react";
import {
  FormDialogContext,
  type DialogContextType,
} from "@/contexts/form-dialog.context";

export function useDialog<T>() {
  const ctx = useContext(FormDialogContext) as DialogContextType<T>;

  if (!ctx) throw new Error("useDialog must be used within DialogProvider");
  return ctx;
}
