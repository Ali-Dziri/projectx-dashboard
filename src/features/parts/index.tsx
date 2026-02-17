import { useState, useEffect } from "react";
import { PageLayout } from "@/layouts/page-layout";
import useDebounceValue from "@/hooks/useDebounceValue";
import { partsModule } from "./parts.module";
import PartsUpsertForm from "./parts-upsert-form";
import type { PartsData, PartsFields } from "./type";
import type { AnyRoute } from "@tanstack/react-router";
import type { PaginatedData } from "@/types/common";

interface PartsPageProps {
  data: PaginatedData<PartsData>;
  fields: PartsFields;
  route: AnyRoute;
  onSearchChange: (search: string) => void;
}

export function PartsPage({
  data,
  fields,
  route,
  onSearchChange,
}: PartsPageProps) {
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounceValue(searchValue, 500);

  useEffect(() => {
    onSearchChange(debouncedValue);
  }, [debouncedValue, onSearchChange]);

  return (
    <PageLayout<PartsData>
      route={route}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      tableProps={{
        tableData: data,
        columns: partsModule.columns,
      }}
      formDialog={
        <PartsUpsertForm
          models={fields.models}
          categories={fields.categories}
          addPart={partsModule.service.add.bind(partsModule.service)}
        />
      }
    />
  );
}
