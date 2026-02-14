import type { Columns, PaginatedData } from "@/types/common";
import type { AnyRouteMatch } from "@tanstack/react-router";

export interface FormDialogProps {
  children: React.ReactNode;
  formDialogTitle: string | React.ReactNode;
  okBtnProps: {
    formId: string;
    isLoading?: boolean;
    disabled?: boolean;
    className?: string;
  };
  open: boolean;
  setOpen: (open: boolean) => void;
}

export type PageFormProps = Omit<FormDialogProps, "open" | "setOpen">;

export interface TableProps<T> {
  tableData: PaginatedData<T>;
  columns: Columns<T>;
}

export interface PaginationProps {
  path: AnyRouteMatch["fullPath"];
  totalPages: number;
  currentPage: number;
}
