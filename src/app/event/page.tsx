import React from "react";
import Events from "./component/Events";
import EventSearch from "./component/EventSearch";
import { Separator } from "@/components/ui/separator";

export interface EventProps {
  searchParams: { [key: string]: string | undefined };
}

const Event = ({ searchParams }: EventProps) => {
  return (
    <div className="conteiner m-10 space-y-10">
      <EventSearch />
      <div className="md:mx-5 mt-10">
        <Separator className="bg-slate-800" />
      </div>
      <div className="md:mx-5">
        <Events searchParams={searchParams} />
      </div>
    </div>
  );
};

export default Event;
