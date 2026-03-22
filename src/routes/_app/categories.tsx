import { createFileRoute } from "@tanstack/react-router";
import {
  categoriesModule,
  CategoriesPage,
} from "@/features/categories/categories.module";
import { searchParamsSchema } from "@/shared/types/schemas";

export const Route = createFileRoute("/_app/categories")({
  validateSearch: searchParamsSchema.parse,
  staticData: {
    title: "Phones Categories",
  },
  loaderDeps: ({ search }) => ({
    page: search.page,
    limit: search.limit,
    search: search.search,
  }),
  loader: async ({ deps: { page, limit, search } }) => {
    return await categoriesModule.service.fetch({ page, limit, search });
  },
  component: RouteComponent,
});

function RouteComponent() {
  const response = Route.useLoaderData();
  const navigate = Route.useNavigate();

  const handleSearchChange = (search: string) => {
    navigate({
      search: (prev) => ({ ...prev, search }),
    });
  };
  return (
    <CategoriesPage
      data={response.data}
      route={Route}
      onSearchChange={handleSearchChange}
    />
  );
}
