"use client";

import { useEffect, useState } from "react";

import { appConfig } from "@/lib/config";
import Link from "next/link";
import Image from "next/image";
import EventSearchBar from "./EventSearchBar";
import { EventAsset, EventEntry } from "@/types/TypesEvent";

const { accessToken, baseUrl, environmentId, spaceId } = appConfig;

const EventSearch = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<EventEntry[]>([]);
  const [assets, setAssets] = useState<EventAsset[]>([]);

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  useEffect(() => {
    if (searchValue) {
      fetchEvents(searchValue);
    }
  }, [searchValue]);

  const fetchEvents = async (query: string) => {
    try {
      const response = await fetch(
        `https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries?access_token=${accessToken}&query=${query}&include=1&content_type=event`,
      );
      const data = await response.json();

      setSearchResults(data.items);
      setAssets(data.includes?.Asset || []); // Simpan assets dari includes

      //   const filteredItems = data.items.filter(
      //     (item: ContentfulEntry) => item.sys.contentType.sys.id === "article",
      //   ); // Sesuaikan dengan ID content_type artikel Anda
      //   setSearchResults(filteredItems);
      //   setAssets(data.includes?.Asset || []); // Simpan assets dari includes
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  function getThumbnailUrl(
    event: EventEntry,
    assets: EventAsset[],
  ): string | undefined {
    const posterId = event.fields.poster.sys.id;
    const asset = assets.find((a) => a.sys.id === posterId);
    return asset ? `https:${asset.fields.file.url}` : undefined;
  }

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="z-10 w-full max-w-7xl items-center justify-between px-4 font-mono text-sm md:px-6 text-center">
        <h1 className="my-10 text-center text-5xl">Cari Event</h1>
        <EventSearchBar onSearch={handleSearch} />
        <h2 className="mx-2 mt-20 text-2xl underline">Hasil Pencarian:</h2>

        <div className="mt-6 grid grid-cols-1 place-items-center gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {searchResults.length > 0 ? (
            searchResults.map((event) => (
              <Link href={`/${event.fields.slug}`} key={event.sys.id}>
                <div className="mx-auto flex h-[380px] max-w-sm transform flex-col rounded-2xl bg-white p-6 shadow-lg transition-transform hover:scale-105 hover:shadow-2xl">
                  <div className="relative h-[200px] w-full overflow-hidden rounded-lg">
                    <Image
                      src={
                        getThumbnailUrl(event, assets) || "/default-image.jpg"
                      }
                      alt="thumbnail"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </div>
                  <div className="mt-4 flex flex-grow flex-col text-left">
                    <h2 className="line-clamp-2 text-lg font-semibold">
                      {event.fields.title}
                    </h2>
                  
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="col-span-full text-center text-red-500">
              Tidak ada hasil ditemukan
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventSearch;
