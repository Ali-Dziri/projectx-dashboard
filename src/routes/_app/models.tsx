import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { modelsModule, ModelsPage } from "@/features/models/models.module";

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
    const res = await modelsModule.service.fetch({ page, limit, search });
    const res2 = await modelsModule.service.fields();
    return {
      data: res,
      fields: res2,
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { data, fields } = Route.useLoaderData();
  const navigate = Route.useNavigate();

  const handleSearchChange = (search: string) => {
    navigate({
      search: (prev) => ({ ...prev, search }),
    });
  };

  return (
    <ModelsPage
      route={Route}
      data={data.data}
      fields={fields.data}
      onSearchChange={handleSearchChange}
    />
  );
}
