import { Button } from "@/components/ui";

export function Pagination({ pagination, onPageChange }) {
  if (!pagination || pagination.totalPages <= 1) return null;

  const { page, totalPages } = pagination;
  const pages = [];
  for (let i = 1; i <= totalPages; i += 1) {
    if (i === 1 || i === totalPages || Math.abs(i - page) <= 1) pages.push(i);
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button variant="outline" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
        Prev
      </Button>
      {pages.map((item, index) => (
        <Button
          key={`${item}-${index}`}
          variant={item === page ? "default" : "outline"}
          onClick={() => onPageChange(item)}
          className="min-w-10"
        >
          {item}
        </Button>
      ))}
      <Button variant="outline" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>
        Next
      </Button>
    </div>
  );
}
