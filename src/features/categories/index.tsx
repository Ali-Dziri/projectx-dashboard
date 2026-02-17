import { useState, useEffect } from "react";
import { PageLayout } from "@/layouts/page-layout";
import useDebounceValue from "@/hooks/useDebounceValue";
import type { AnyRoute } from "@tanstack/react-router";
import type { PaginatedData } from "@/types/common";
import { categoriesModule, type CategoriesData } from "./categories.module";
import CategoriesUpsertForm from "./categories-upsert-form";

interface CategoriesPageProps {
  route: AnyRoute;
  data: PaginatedData<CategoriesData>;
  onSearchChange: (search: string) => void;
}

export function CategoriesPage({
  route,
  data,
  onSearchChange,
}: CategoriesPageProps) {
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounceValue(searchValue, 500);

  useEffect(() => {
    onSearchChange(debouncedValue);
  }, [debouncedValue, onSearchChange]);
  return (
    <PageLayout<CategoriesData>
      route={route}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      tableProps={{
        tableData: data,
        columns: categoriesModule.columns,
      }}
      formDialog={
        <CategoriesUpsertForm
          addCategory={categoriesModule.service.add.bind(
            categoriesModule.service,
          )}
        />
      }
    />
  );
}
