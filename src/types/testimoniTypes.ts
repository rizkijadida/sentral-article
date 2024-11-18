import { TestimoniEntry } from "./contenfuTestimoniTypes";
import { ContentfulEntry } from "./contentfultypes";

export interface testimoniType
  extends Pick<TestimoniEntry["fields"], "title" | "content" | "sender" | "slug" | "level" | "location">  {
  id: string; // Ambil dari ContentfulEntry.sys.id
  date: string; // Ambil dari ContentfulEntry.sys.createdAt
  fotoPeserta: string
}
