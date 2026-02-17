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
import { PlusIcon } from "lucide-react";
import type { FormDialogProps } from "./types";
import { Field } from "./ui/field";
import { Spinner } from "./ui/spinner";
import { useDialog } from "@/hooks/use-dialog";

export default function FormDialog({
  children,
  formDialogTitle,
  formId,
  handleFormSubmit,
  loading,
}: FormDialogProps) {
  const { isOpen, closeDialog, openDialog } = useDialog();

  return (
    <Dialog open={isOpen} onOpenChange={(v) => !v && closeDialog()}>
      <form id={formId} onSubmit={handleFormSubmit}>
        <DialogTrigger asChild>
          <Button variant="outline" onClick={() => openDialog()}>
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
            <Field orientation="horizontal">
              <Button
                type="submit"
                form={formId}
                disabled={loading}
                aria-disabled={loading}
              >
                {loading && <Spinner data-icon="inline-start" />}
                Submit
              </Button>
              <DialogClose asChild>
                <Button variant="outline">Close</Button>
              </DialogClose>
            </Field>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
