import type { TableProps } from "@/components/types";
import type { AnyRoute } from "@tanstack/react-router";

export interface PageLayoutProps<T> {
  route: AnyRoute;
  searchValue: string;
  setSearchValue: (value: string) => void;
  tableProps: TableProps<T>;
  formDialog: React.ReactElement;
}
