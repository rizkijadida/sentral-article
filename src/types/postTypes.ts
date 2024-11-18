import { ContentfulEntry } from "./contentfultypes";

export interface post
  extends Pick<ContentfulEntry["fields"], "title" | "description" | "author" | "slug" | "category" >  {
  id: string; // Ambil dari ContentfulEntry.sys.id
  createdAt: string; // Ambil dari ContentfulEntry.sys.createdAt
  thumbnail: string
}
