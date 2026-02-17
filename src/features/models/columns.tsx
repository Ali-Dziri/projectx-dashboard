import type { Columns } from "@/types/common";
import type { ModelDataType } from "./types";
import dayjs from "dayjs";
import { modelsModule } from "./models.module";
import TableActions from "@/components/table-actions";

export const columns: Columns<ModelDataType> = [
  {
    key: "name",
    name: "Name",
  },
  {
    key: "brand",
    name: "Brand",
    render: (item: ModelDataType) => item.brand.name,
  },
  {
    key: "release_date",
    name: "Release date",
    render: (item: ModelDataType) =>
      dayjs(item.release_date).format("YYYY-MM-DD"),
  },
  {
    key: "actions",
    name: "Actions",
    render: (item: ModelDataType) => (
      <TableActions<ModelDataType>
        item={item}
        deleteItem={() => modelsModule.service.delete(item.id)}
      />
    ),
  },
];
