import { PaginationWithLinks } from "@/app/components/PaginationWithLink";
import EventList from "./EventList";
import { fetchEvents } from "@/lib/fetchEvent";

interface EventsProps {
  searchParams: { [key: string]: string | undefined };
}

export default async function Events({ searchParams }: EventsProps) {
  const currentPage = parseInt((searchParams.page as string) || "1");
  const postsPerPage = parseInt((searchParams.pageSize as string) || "5");

  const { events, totalEvents } = await fetchEvents(currentPage, postsPerPage);

  return (
    <div className="container mx-auto grid items-end justify-between">
      <EventList eventList={events} />

      <div className="mx-auto my-5 flex max-w-screen-lg grid-cols-1 items-center justify-center gap-6 md:grid-cols-3">
        <PaginationWithLinks
          page={currentPage}
          pageSize={postsPerPage}
          totalCount={totalEvents}
          pageSizeSelectOptions={{
            pageSizeOptions: [6, 12, 24, 36],
          }}
        />
      </div>
    </div>
  );
}
