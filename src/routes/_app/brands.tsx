import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { brandsModule, BrandsPage } from "@/features/brands/brands.module";

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
  loader: async ({ deps: { page, limit, search } }) => {
    return await brandsModule.service.fetch({ page, limit, search });
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
    <BrandsPage
      route={Route}
      data={response.data}
      onSearchChange={handleSearchChange}
    />
  );
}
