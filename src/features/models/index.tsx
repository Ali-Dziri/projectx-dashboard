import { useState, useEffect } from "react";
import { PageLayout } from "@/layouts/page-layout";
import useDebounceValue from "@/hooks/useDebounceValue";
import type { AnyRoute } from "@tanstack/react-router";
import type { PaginatedData } from "@/types/common";
import ModelsUpsertForm from "./models-upsert-form";
import { modelsModule, type ModelDataType, type Fields } from "./models.module";

interface ModelsPageProps {
  route: AnyRoute;
  fields: Fields;
  data: PaginatedData<ModelDataType>;
  onSearchChange: (search: string) => void;
}

export function ModelsPage({
  route,
  data,
  fields,
  onSearchChange,
}: ModelsPageProps) {
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounceValue(searchValue, 500);

  useEffect(() => {
    onSearchChange(debouncedValue);
  }, [debouncedValue, onSearchChange]);
  return (
    <PageLayout<ModelDataType>
      route={route}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      tableProps={{
        tableData: data,
        columns: modelsModule.columns,
      }}
      formDialog={
        <ModelsUpsertForm
          addModel={modelsModule.service.add.bind(modelsModule.service)}
          brands={fields.brands}
        />
      }
    />
  );
}
