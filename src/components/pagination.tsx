import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { PaginationProps } from "./types";

export default function PaginationComponent({
  path,
  totalPages,
  currentPage,
}: PaginationProps) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            from={path}
            search={(prev) => ({
              ...prev,
              page: prev.page > 1 ? prev.page - 1 : prev.page,
            })}
          />
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              size="icon"
              isActive={index + 1 === currentPage}
              from={path}
              search={(prev) => ({ ...prev, page: index + 1 })}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            from={path}
            search={(prev) => ({
              ...prev,
              page: prev.page < totalPages ? prev.page + 1 : prev.page,
            })}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
