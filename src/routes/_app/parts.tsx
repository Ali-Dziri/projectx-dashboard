import { createFileRoute } from "@tanstack/react-router";
import { partsModule, PartsPage } from "@/features/parts/parts.module";
import { searchParamsSchema } from "@/shared/types/schemas";

export const Route = createFileRoute("/_app/parts")({
  validateSearch: searchParamsSchema,
  staticData: {
    title: "Phones Parts",
  },
  loaderDeps: ({ search }) => ({
    page: search.page,
    limit: search.limit,
    search: search.search,
  }),
  loader: async ({ deps: { page, limit, search } }) => {
    const res = await partsModule.service.fetch({ page, limit, search });
    const res2 = await partsModule.service.fields();
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
    <PartsPage
      data={data.data}
      fields={fields.data}
      route={Route}
      onSearchChange={handleSearchChange}
    />
  );
}
