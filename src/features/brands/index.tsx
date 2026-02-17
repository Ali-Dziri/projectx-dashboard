import { useState, useEffect } from "react";
import { PageLayout } from "@/layouts/page-layout";
import useDebounceValue from "@/hooks/useDebounceValue";
import type { AnyRoute } from "@tanstack/react-router";
import type { PaginatedData } from "@/types/common";
import { brandsModule, type BrandsData } from "./brands.module";
import BrandsUpsertForm from "./brands-upsert-form";

interface BrandsPageProps {
  data: PaginatedData<BrandsData>;
  route: AnyRoute;
  onSearchChange: (search: string) => void;
}

export function BrandsPage({ data, route, onSearchChange }: BrandsPageProps) {
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounceValue(searchValue, 500);

  useEffect(() => {
    onSearchChange(debouncedValue);
  }, [debouncedValue, onSearchChange]);

  return (
    <PageLayout<BrandsData>
      route={route}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      tableProps={{
        tableData: data,
        columns: brandsModule.column,
      }}
      formDialog={
        <BrandsUpsertForm
          addBrand={brandsModule.service.add.bind(brandsModule.service)}
          updateBrand={brandsModule.service.update.bind(brandsModule.service)}
        />
      }
    />
  );
}
