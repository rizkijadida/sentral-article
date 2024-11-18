import { TestimoniAsset, TestimoniEntry, TestimoniResponse } from "@/types/contenfuTestimoniTypes";

import { appConfig } from "./config";
import { testimoniType } from "@/types/testimoniTypes";

const { accessToken, baseUrl, environmentId, spaceId } = appConfig;

function mapContentfulToTestimoni(
  testimoniEntry: TestimoniEntry,
  assets: TestimoniAsset[],
): testimoniType{
  const fotoPesertaId = testimoniEntry.fields.fotoPeserta.sys.id;
  const fotoPesertaAsset = assets.find((asset) => asset.sys.id === fotoPesertaId);
  // Dapatkan URL dari asset yang sesuai
  const thumbnailUrl = fotoPesertaAsset
    ? `https:${fotoPesertaAsset.fields.file.url}`
    : "";
  return {
    id: testimoniEntry.sys.id,
    title: testimoniEntry.fields.title,
    content: testimoniEntry.fields.content,
    sender: testimoniEntry.fields.sender,
    date: testimoniEntry.sys.createdAt,
    slug: testimoniEntry.fields.slug,
    level: testimoniEntry.fields.level,
    fotoPeserta: thumbnailUrl,
    location:testimoniEntry.fields.location
  };
}

export async function fetchTestimoni(
  page: number,
  perPage: number,
): Promise<{ testimonis: testimoniType[]; totalTestimonis: number }> {
  const skip = (page - 1) * perPage;

  const res = await fetch(
    `${baseUrl}/spaces/${spaceId}/environments/${environmentId}/entries?access_token=${accessToken}&content_type=testimoni&skip=${skip}&limit=${perPage}`,
    { cache: "no-store" },
  );
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  const data: TestimoniResponse = await res.json();

  const testimonis = data.items.map((testimoniEntry) =>
    mapContentfulToTestimoni(testimoniEntry, data.includes.Asset),
  );
  const totalTestimonis = data.total;

  return { testimonis, totalTestimonis };
}
