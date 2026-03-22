import { FormDialogContext } from "@/contexts/form-dialog.context";
import React, { useState } from "react";

export function DialogProvider({ children }: { children: React.ReactElement }) {
  const [isOpen, setOpen] = useState(false);
  const [payload, setPayload] = useState(null);

  const openDialog = (data?: any) => {
    setPayload(data ?? null);
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    setPayload(null);
  };

  return (
    <FormDialogContext.Provider
      value={{ isOpen, payload, openDialog, closeDialog }}
    >
      {children}
    </FormDialogContext.Provider>
  );
}
