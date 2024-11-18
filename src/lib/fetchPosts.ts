import { post } from "@/types/postTypes";
import { appConfig } from "./config";
import {
  Asset,
  ContentfulEntry,
  ContentfulResponse,
} from "@/types/contentfultypes";

const { accessToken, baseUrl, environmentId, spaceId } = appConfig;

function mapContentfulToPost(
  contentfulEntry: ContentfulEntry,
  assets: Asset[],
): post {
  const thumbnailId = contentfulEntry.fields.thumbnail.sys.id;
  const thumbnailAsset = assets.find((asset) => asset.sys.id === thumbnailId);
  // Dapatkan URL dari asset yang sesuai
  const thumbnailUrl = thumbnailAsset
    ? `https:${thumbnailAsset.fields.file.url}`
    : "";
  return {
    id: contentfulEntry.sys.id,
    title: contentfulEntry.fields.title,
    description: contentfulEntry.fields.description,
    author: contentfulEntry.fields.author,
    createdAt: contentfulEntry.sys.createdAt,
    slug: contentfulEntry.fields.slug,
    category: contentfulEntry.fields.category,
    thumbnail: thumbnailUrl,
  };
}

export async function fetchPosts(
  page: number,
  perPage: number,
): Promise<{ posts: post[]; totalPosts: number }> {
  const skip = (page - 1) * perPage;

  const res = await fetch(
    `${baseUrl}/spaces/${spaceId}/environments/${environmentId}/entries?access_token=${accessToken}&content_type=blog&skip=${skip}&limit=${perPage}`,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  const data: ContentfulResponse = await res.json();

  const posts = data.items.map((contentfulEntry) =>
    mapContentfulToPost(contentfulEntry, data.includes.Asset),
  );
  const totalPosts = data.total;

  return { posts, totalPosts };
}
