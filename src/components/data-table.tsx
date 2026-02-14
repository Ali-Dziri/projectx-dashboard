import {
  Table,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import type { TableProps } from "./types";

function DataTable<T>({ tableData, columns }: TableProps<T>) {
  const { data } = tableData;

  return (
    <Table>
      <TableHeader className="bg-muted sticky top-0 z-10">
        <TableRow>
          {columns.map((header) => (
            <TableHead key={header.key}>{header.name}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            {columns.map((col) => {
              if (col.render) {
                return (
                  <TableCell className="h-12" key={col.key}>
                    {col.render(item)}
                  </TableCell>
                );
              }
              return (
                <TableCell className="h-12" key={col.key}>
                  {item[col.key] ?? "N/A"}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default DataTable;
