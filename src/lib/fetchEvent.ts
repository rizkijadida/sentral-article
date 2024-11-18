import { EventListComponents } from "@/types/eventListTypes";
import { appConfig } from "./config";
import { EventAsset, EventEntry, EventResponse } from "@/types/TypesEvent";

const { accessToken, baseUrl, environmentId, spaceId } = appConfig;

// Mapper function to convert Contentful entry to Event type
function mapContentfulToEvent(
  contentfulEntry: EventEntry,
  assets: EventAsset[],
): EventListComponents {
  const posterId = contentfulEntry.fields.poster.sys.id;
  const posterAsset = assets.find((asset) => asset.sys.id === posterId);
  // Get the URL of the associated asset
  const posterUrl = posterAsset ? `https:${posterAsset.fields.file.url}` : "";

  return {
    id: contentfulEntry.sys.id,
    title: contentfulEntry.fields.title,
    slug: contentfulEntry.fields.slug,
    caption: contentfulEntry.fields.caption,
    organizer: contentfulEntry.fields.organizer,
    createdAt: contentfulEntry.sys.createdAt,
    poster: posterUrl,
    date: contentfulEntry.fields.date
  };
}

// Fetch events from Contentful
export async function fetchEvents(
  page: number,
  perPage: number,
): Promise<{ events: EventListComponents[]; totalEvents: number }> {
  const skip = (page - 1) * perPage;

  const res = await fetch(
    `${baseUrl}/spaces/${spaceId}/environments/${environmentId}/entries?access_token=${accessToken}&content_type=event&skip=${skip}&limit=${perPage}`,
    { cache: "no-store" },
  );
  if (!res.ok) {
    throw new Error("Failed to fetch events");
  }

  const data: EventResponse = await res.json();

  const events = data.items.map((contentfulEntry) =>
    mapContentfulToEvent(contentfulEntry, data.includes.Asset),
  );
  const totalEvents = data.total;

  return { events, totalEvents };
}
