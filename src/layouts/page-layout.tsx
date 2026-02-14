import DataTable from "@/components/data-table";
import { Input } from "@/components/ui/input";
import FormDialog from "@/components/form-dialog";
import { useState } from "react";
import PaginationComponent from "@/components/pagination";
import type { PageLayoutProps } from "./types";

export function PageLayout<T>({
  route,
  searchValue,
  setSearchValue,
  tableProps,
  formProps,
}: PageLayoutProps<T>) {
  const match = route.useMatch();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-5">
        <Input
          type="search"
          placeholder="Search..."
          className="mb-4"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <FormDialog
          formDialogTitle={formProps.formDialogTitle}
          okBtnProps={formProps.okBtnProps}
          open={open}
          setOpen={setOpen}
        >
          {formProps.children}
        </FormDialog>
      </div>
      <div>
        <DataTable<T> {...tableProps} />
        <PaginationComponent
          path={match.fullPath}
          totalPages={tableProps.tableData.totalPages}
          currentPage={tableProps.tableData.currentPage}
        />
      </div>
    </div>
  );
}
