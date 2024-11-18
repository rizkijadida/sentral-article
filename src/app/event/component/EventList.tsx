import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { EventListComponents } from "@/types/eventListTypes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface EventListProps {
  eventList: EventListComponents[];
}

const EventList: React.FC<EventListProps> = ({ eventList }) => {
  return (
    <div className="grid grid-cols-1 items-end gap-6 px-4 py-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {eventList.map((list: EventListComponents) => (
        <Link href={`/event/${list.slug}`} key={list.id}>
          <Card className="mx-auto flex h-[380px] max-w-sm transform flex-col rounded-2xl bg-white p-2 shadow-lg transition-transform hover:scale-105 hover:shadow-2xl">
            <CardHeader>
              <div className="relative mb-4 h-[200px] w-full overflow-hidden rounded-lg">
                <Image
                  src={list.poster}
                  alt="thumbnail"
                  className="h-full w-full object-cover"
                  fill
                />
              </div>
              <div className="flex-grow text-left">
                <h2 className="mb-2 line-clamp-2 text-base font-semibold text-gray-900">
                  {`${list.title} (post ${list.id})`}
                </h2>
              </div>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default EventList;
