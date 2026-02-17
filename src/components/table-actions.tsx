import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon, Pencil, Trash } from "lucide-react";
import { AlertDialogDestructive } from "./alert-dialog-destructive";
import { useState } from "react";
import { useDialog } from "@/hooks/use-dialog";

interface TableActionsProps<T> {
  item: T;
  deleteItem: () => Promise<void>;
}

export default function TableActions<T>({
  item,
  deleteItem,
}: TableActionsProps<T>) {
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const { openDialog } = useDialog();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8">
            <MoreHorizontalIcon />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => openDialog(item)}>
            <Pencil /> Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={() => setOpenAlertDialog(true)}
          >
            <Trash />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogDestructive
        open={openAlertDialog}
        setOpen={setOpenAlertDialog}
        deleteItem={deleteItem}
      />
    </>
  );
}
