import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Spinner } from "./ui/spinner";
import { PlusIcon } from "lucide-react";
import type { FormDialogProps } from "./types";

export default function FormDialog({
  children,
  formDialogTitle,
  okBtnProps,
  open,
  setOpen,
}: FormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusIcon />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{formDialogTitle}</DialogTitle>
          <DialogDescription>
            Fill out the form to add a new item to the table"
          </DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
          <Button
            type="submit"
            form={okBtnProps.formId}
            disabled={okBtnProps.disabled}
            className={okBtnProps.className}
          >
            Save
            {okBtnProps?.isLoading && <Spinner data-icon="inline-start" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
