import { createFileRoute } from "@tanstack/react-router";
import { ModelsService } from "@/features/models/models.service";
import type { ModelDataType } from "@/features/models/types";
import { z } from "zod";
import { PageLayout } from "@/layouts/page-layout";
import useDebounceValue from "@/hooks/useDebounceValue";
import { useEffect, useState } from "react";
import { columns } from "@/features/models/columns";
import ModelsUpsertForm from "@/features/models/models-upsert-form";

const modelsService = new ModelsService();

const modelsSearchSchema = z.object({
  page: z.number().default(1),
  limit: z.number().optional().default(10),
  search: z.string().optional().default(""),
});

export const Route = createFileRoute("/_app/models")({
  validateSearch: (search) => modelsSearchSchema.parse(search),
  staticData: {
    title: "Phones Models",
  },
  loaderDeps: ({ search }) => ({
    page: search.page,
    limit: search.limit,
    search: search.search,
  }),
  loader: async ({ deps: { page, limit, search } }) => {
    const res = await modelsService.fetch({ page, limit, search });
    const res2 = await modelsService.fields();
    return {
      data: res,
      fields: res2,
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const response = Route.useLoaderData();
  console.log("response", response);
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounceValue(searchValue, 500);
  const navigate = Route.useNavigate();

  useEffect(() => {
    navigate({
      search: (prev: z.infer<typeof modelsSearchSchema>) => ({
        ...prev,
        search: debouncedValue,
      }),
    });
  }, [debouncedValue, navigate]);

  return (
    <PageLayout<ModelDataType>
      route={Route}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      tableProps={{
        tableData: response.data.data,
        columns: columns,
      }}
      formProps={{
        children: <ModelsUpsertForm brands={response.fields.data.brands} />,
        formDialogTitle: "Add Model",
        okBtnProps: {
          formId: "upsert-model",
        },
      }}
    />
  );
}
