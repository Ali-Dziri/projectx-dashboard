import type { Columns } from "@/types/common";
import { categoriesModule } from "./categories.module";
import TableActions from "@/components/table-actions";
interface CategoriesData {
  id: string;
  name: string;
  description: string;
}

export const columns: Columns<CategoriesData> = [
  {
    key: "name",
    name: "Name",
  },
  {
    key: "description",
    name: "Description",
  },
  {
    key: "actions",
    name: "Actions",
    render: (item: CategoriesData) => (
      <TableActions<CategoriesData>
        item={item}
        deleteItem={() => categoriesModule.service.delete(item.id)}
      />
    ),
  },
];
