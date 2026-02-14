import type { PageFormProps, TableProps } from "@/components/types";
import type { AnyRoute, RouteApi } from "@tanstack/react-router";

export interface PageLayoutProps<T> {
  route: RouteApi<AnyRoute>;
  searchValue: string;
  setSearchValue: (value: string) => void;
  tableProps: TableProps<T>;
  formProps: PageFormProps;
}
