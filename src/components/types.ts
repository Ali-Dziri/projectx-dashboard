import type { Columns, PaginatedData } from "@/types/common";
import type { AnyRouteMatch } from "@tanstack/react-router";

export interface FormDialogProps {
  children: React.ReactElement;
  formDialogTitle: string | React.ReactNode;
  formId: string;
  handleFormSubmit: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined,
  ) => Promise<void>;
  loading: boolean;
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
