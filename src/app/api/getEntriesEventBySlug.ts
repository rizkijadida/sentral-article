import { appConfig } from "@/lib/config";
import { EventResponse } from "@/types/TypesEvent";

const { accessToken, baseUrl, environmentId, spaceId } = appConfig;

export const getEntryBySlugEvent = async (
  slug: string,
): Promise<EventResponse> => {
  const res = await fetch(
    `${baseUrl}/spaces/${spaceId}/environments/${environmentId}/entries?access_token=${accessToken}&content_type=event&fields.slug=${slug}`,
    { next: { revalidate: 10 } },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch event data");
  }

  return res.json();
};
