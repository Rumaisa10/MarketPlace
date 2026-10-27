import Link from "next/link";

type Props = {
  currentPage: number;
  totalPages: number;
  params: Record<string, string | undefined>;
};

function buildHref(params: Props["params"], page: number) {
  const sp = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value) sp.set(key, value);
  }
  if (page > 1) sp.set("page", String(page));
  const qs = sp.toString();
  return qs ? `/?${qs}` : "/";
}

export default function Pagination({ currentPage, totalPages, params }: Props) {
  if (totalPages <= 1) return null;

  const linkClass = "rounded-lg border border-gray-300 px-3 py-2 text-sm hover:bg-gray-100";
  const disabledClass = "rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-400";

  return (
    <nav aria-label="Pagination" className="my-4 flex items-center justify-center gap-4">
      {currentPage > 1 ? (
        <Link href={buildHref(params, currentPage - 1)} className={linkClass}>
          Previous
        </Link>
      ) : (
        <span aria-disabled="true" className={disabledClass}>Previous</span>
      )}

      <span className="text-sm">Page {currentPage} of {totalPages}</span>

      {currentPage < totalPages ? (
        <Link href={buildHref(params, currentPage + 1)} className={linkClass}>
          Next
        </Link>
      ) : (
        <span aria-disabled="true" className={disabledClass}>Next</span>
      )}
    </nav>
  );
}