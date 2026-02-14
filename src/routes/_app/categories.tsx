import { createFileRoute } from "@tanstack/react-router";
import { CategoriesService } from "@/features/categories/categories.service";
import CategoriesUpsertForm from "@/features/categories/categories-upsert-form";
import { columns } from "@/features/categories/columns";
import { z } from "zod";
import { PageLayout } from "@/layouts/page-layout";
import useDebounceValue from "@/hooks/useDebounceValue";
import { useEffect, useState } from "react";

const categoriesService = new CategoriesService();

interface CategoriesData {
  id: string;
  name: string;
  description: string;
}

const brandsSearchSchema = z.object({
  page: z.number().default(1),
  limit: z.number().optional().default(10),
  search: z.string().optional().default(""),
});

export const Route = createFileRoute("/_app/categories")({
  validateSearch: (search) => brandsSearchSchema.parse(search),
  staticData: {
    title: "Phones Categories",
  },
  loaderDeps: ({ search }) => ({
    page: search.page,
    limit: search.limit,
    search: search.search,
  }),
  loader: async ({ deps: { page, limit, search } }) =>
    categoriesService.fetch({ page, limit, search }),
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
  return (
    <PageLayout<CategoriesData>
      route={Route}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      tableProps={{
        tableData: response.data,
        columns,
      }}
      formProps={{
        children: <CategoriesUpsertForm />,
        formDialogTitle: "Add Category",
        okBtnProps: {
          formId: "upsert-category",
        },
      }}
    />
  );
}
