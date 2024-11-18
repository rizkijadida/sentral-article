import { PaginationWithLinks } from "@/app/components/PaginationWithLink";
import { fetchTestimoni } from "@/lib/fetchTestimoni";
import TestimoniList from "./TestimoniList";

interface TestimoniProps {
  searchParams: { [key: string]: string | undefined };
}
export default async function Testimonix({ searchParams }: TestimoniProps) {
  const currentPage = parseInt((searchParams.page as string) || "1");
  const postsPerPage = parseInt((searchParams.pageSize as string) || "5");

  const { testimonis, totalTestimonis } = await fetchTestimoni(
    currentPage,
    postsPerPage,
  );

  return (
    <div className="container mx-auto">
      <TestimoniList testimonis={testimonis} />
      <div className="mx-auto my-5 flex max-w-screen-lg grid-cols-1 items-center justify-center gap-6 md:grid-cols-3">
        <PaginationWithLinks
          page={currentPage}
          pageSize={postsPerPage}
          totalCount={totalTestimonis}
          pageSizeSelectOptions={{
            pageSizeOptions: [6, 12, 24, 36],
          }}
        />
      </div>
    </div>
  );
}
