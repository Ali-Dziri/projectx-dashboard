import type { BrandsData } from "./types";
import { Link } from "@tanstack/react-router";
import type { Columns } from "@/types/common";
import { brandsModule } from "./brands.module";
import TableActions from "@/components/table-actions";

export const columns: Columns<BrandsData> = [
  {
    key: "name",
    name: "Name",
  },
  {
    key: "website",
    name: "Website",
    render: (item: BrandsData) => (
      <Link to={item.website} target="_blank" className="text-primary">
        {item.website}
      </Link>
    ),
  },
  {
    key: "countryOfOrigin",
    name: "Country of Origin",
  },
  {
    key: "actions",
    name: "Actions",
    render: (item: BrandsData) => (
      <TableActions<BrandsData>
        item={item}
        deleteItem={() => brandsModule.service.delete(item.id)}
      />
    ),
  },
];
