import { createFileRoute } from "@tanstack/react-router";
import { PartsService } from "@/features/parts/parts.service";
import { z } from "zod";
import { PageLayout } from "@/layouts/page-layout";
import useDebounceValue from "@/hooks/useDebounceValue";
import { useEffect, useState } from "react";
import { columns } from "@/features/parts/columns";
import type { PartsData } from "@/features/parts/type";
import PartsUpsertForm from "@/features/parts/parts-upsert-form";

const partsService = new PartsService();

const partsSearchSchema = z.object({
  page: z.number().default(1),
  limit: z.number().optional().default(10),
  search: z.string().optional().default(""),
});

export const Route = createFileRoute("/_app/parts")({
  validateSearch: (search) => partsSearchSchema.parse(search),
  staticData: {
    title: "Phones Parts",
  },
  loaderDeps: ({ search }) => ({
    page: search.page,
    limit: search.limit,
    search: search.search,
  }),
  loader: async ({ deps: { page, limit, search } }) => {
    const res = await partsService.fetch({ page, limit, search });
    const res2 = await partsService.fields();
    return {
      data: res,
      fields: res2,
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { data, fields } = Route.useLoaderData();
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounceValue(searchValue, 500);
  const navigate = Route.useNavigate();

  useEffect(() => {
    navigate({
      search: (prev: z.infer<typeof partsSearchSchema>) => ({
        ...prev,
        search: debouncedValue,
      }),
    });
  }, [debouncedValue, navigate]);
  console.log(fields);

  return (
    <PageLayout<PartsData>
      route={Route}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      tableProps={{
        tableData: data.data,
        columns: columns,
      }}
      formProps={{
        children: (
          <PartsUpsertForm
            models={fields.data?.models}
            categories={fields.data?.categories}
          />
        ),
        formDialogTitle: "Add Part",
        okBtnProps: {
          formId: "upsert-part",
        },
      }}
    />
  );
}
