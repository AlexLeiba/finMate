import {
  Pagination as PaginationContainer,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useExpenseStore } from "@/store/useExpensesStore";

export function Pagination({
  page,
  totalCount,
}: {
  page: number;
  totalCount: number;
}) {
  const ITEMS_PER_PAGE = 10;
  const setPage = useExpenseStore((state) => state.setPage);
  const pages = Array.from(
    { length: Math.ceil(totalCount / ITEMS_PER_PAGE) },
    (_, index) => index + 1,
  );

  function handleChangePage(page: number) {
    setPage(page);
  }
  return (
    <div>
      <PaginationContainer>
        <PaginationContent>
          <PaginationItem onClick={() => handleChangePage(page - 1)}>
            <PaginationPrevious disabled={page === 1} />
          </PaginationItem>
          {pages.map((item) => (
            <PaginationItem key={item} onClick={() => handleChangePage(item)}>
              <PaginationLink
                title={`Go to page ${item}`}
                className="w-full"
                isActive={item === page}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem onClick={() => handleChangePage(page + 1)}>
            <PaginationNext disabled={page === pages.length} />
          </PaginationItem>
        </PaginationContent>
      </PaginationContainer>
    </div>
  );
}
