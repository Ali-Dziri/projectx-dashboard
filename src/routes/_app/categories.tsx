import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import {
  categoriesModule,
  CategoriesPage,
} from "@/features/categories/categories.module";

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
