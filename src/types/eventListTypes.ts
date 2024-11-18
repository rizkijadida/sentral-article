import { EventEntry } from "./TypesEvent";

export interface EventListComponents
  extends Pick<EventEntry["fields"], "title" | "slug" | "caption" | "organizer"> {
  id: string;
  createdAt: string;
  poster: string;
  date: string;
}
