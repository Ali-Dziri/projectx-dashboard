import type { Columns } from "@/types/common";
import type { PartsData } from "./type";

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
      <div>{item?.compatible_models.map((model) => model.name).join(", ")}</div>
    ),
  },
];
