import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Trash2Icon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { Spinner } from "./ui/spinner";

interface AlertDialogDestructiveProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  deleteItem: () => Promise<void>;
}

export function AlertDialogDestructive({
  open,
  setOpen,
  deleteItem,
}: AlertDialogDestructiveProps) {
  const deleteItemMutation = useMutation({
    mutationFn: deleteItem,
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete Item ?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this item.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={() => deleteItemMutation.mutate()}
          >
            {deleteItemMutation.isPending && (
              <Spinner data-icon="inline-start" />
            )}
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
