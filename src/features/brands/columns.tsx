import type { BrandsData } from "./types";
import { Link } from "@tanstack/react-router";
import type { Columns } from "@/types/common";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon, Pencil, Trash } from "lucide-react";
import { BrandsService } from "./brands.service";

const brandsService = new BrandsService();

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
            onClick={() => brandsService.delete(item.id)}
          >
            <Trash />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
