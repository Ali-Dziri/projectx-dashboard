import DataTable from "@/components/data-table";
import { Input } from "@/components/ui/input";
import PaginationComponent from "@/components/pagination";
import type { PageLayoutProps } from "./types";

export function PageLayout<T>({
  route,
  searchValue,
  setSearchValue,
  tableProps,
  formDialog,
}: PageLayoutProps<T>) {
  const match = route.useMatch();

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
        {formDialog}
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
