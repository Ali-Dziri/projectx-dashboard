import type { Columns } from "@/types/common";
import type { ModelDataType } from "./types";
import dayjs from "dayjs";
import { ModelsService } from "./models.service";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontalIcon, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

const modelsService = new ModelsService();

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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8">
            <MoreHorizontalIcon />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Pencil /> Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={() => modelsService.delete(item.id)}
          >
            <Trash />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
