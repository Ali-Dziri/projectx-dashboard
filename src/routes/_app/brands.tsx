import { createFileRoute } from "@tanstack/react-router";
import { BrandsService } from "@/features/brands/brands.service";
import { z } from "zod";
import { useEffect, useState } from "react";
import useDebounceValue from "@/hooks/useDebounceValue";
import { PageLayout } from "@/layouts/page-layout";
import type { BrandsData } from "@/features/brands/types";
import { columns } from "@/features/brands/columns";
import type { PageFormProps, TableProps } from "@/components/types";
import BrandsUpsertForm from "@/features/brands/brands-upsert-form";

const brandsService = new BrandsService();

const brandsSearchSchema = z.object({
  page: z.number().default(1),
  limit: z.number().optional().default(10),
  search: z.string().optional().default(""),
});

export const Route = createFileRoute("/_app/brands")({
  validateSearch: (search) => brandsSearchSchema.parse(search),
  staticData: {
    title: "Phones Brands",
  },
  loaderDeps: ({ search }) => ({
    page: search.page,
    limit: search.limit,
    search: search.search,
  }),
  loader: async ({ deps: { page, limit, search } }) =>
    brandsService.fetch({ page, limit, search }),
  component: RouteComponent,
});

function RouteComponent() {
  const response = Route.useLoaderData();
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounceValue(searchValue, 500);
  const navigate = Route.useNavigate();

  useEffect(() => {
    navigate({
      search: (prev: z.infer<typeof brandsSearchSchema>) => ({
        ...prev,
        search: debouncedValue,
      }),
    });
  }, [debouncedValue, navigate]);

  const tableProps: TableProps<BrandsData> = {
    tableData: response.data,
    columns: columns,
  };
  const formProps: PageFormProps = {
    children: <BrandsUpsertForm />,
    formDialogTitle: "Add Brand",
    okBtnProps: {
      formId: "upsert-brand",
    },
  };

  return (
    <PageLayout<BrandsData>
      route={Route}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      tableProps={tableProps}
      formProps={formProps}
    />
  );
}
