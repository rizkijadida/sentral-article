import { appConfig } from "@/lib/config";
import { TestimoniResponse } from "@/types/contenfuTestimoniTypes";


const { accessToken, baseUrl, environmentId, spaceId } = appConfig;

export const getEntryTestimoniBySlug = async (
  slug: string,
): Promise<TestimoniResponse> => {
  const res = await fetch(
    `${baseUrl}/spaces/${spaceId}/environments/${environmentId}/entries?access_token=${accessToken}&content_type=testimoni&fields.slug=${slug}`,
    { next: { revalidate: 10 } },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch event data");
  }

  return res.json();
};
