import type { Columns } from "@/types/common";
import type { PartsData } from "./type";
import { Badge } from "@/components/ui/badge";
import { partsModule } from "./parts.module";
import TableActions from "@/components/table-actions";

export const columns: Columns<PartsData> = [
  {
    key: "name",
    name: "Name",
  },
  {
    key: "model",
    name: "Model",
    render: (item: PartsData) => item.model.name,
  },
  {
    key: "category",
    name: "Category",
    render: (item: PartsData) => item.category.name,
  },
  {
    key: "compatible_models",
    name: "Compatible Models",
    render: (item: PartsData) => (
      <div className="flex gap-3">
        {item.compatible_models.map((model) => (
          <Badge key={model.id}>{model.name}</Badge>
        ))}
      </div>
    ),
  },
  {
    key: "actions",
    name: "Actions",
    render: (item: PartsData) => (
      <TableActions<PartsData>
        item={item}
        deleteItem={() => partsModule.service.delete(item.id)}
      />
    ),
  },
];
