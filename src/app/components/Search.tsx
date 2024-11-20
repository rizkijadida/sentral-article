"use client";

import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { Asset, ContentfulEntry } from "@/types/contentfultypes";
import { appConfig } from "@/lib/config";
import Link from "next/link";
import Image from "next/image";

const { accessToken, baseUrl, environmentId, spaceId } = appConfig;

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<ContentfulEntry[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  useEffect(() => {
    if (searchValue) {
      fetchArticles(searchValue);
    }
  }, [searchValue]);

  const fetchArticles = async (query: string) => {
    try {
      const response = await fetch(
        `https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries?access_token=${accessToken}&query=${query}&include=1&content_type=blog`,
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
    article: ContentfulEntry,
    assets: Asset[],
  ): string | undefined {
    const thumbnailId = article.fields.thumbnail.sys.id;
    const asset = assets.find((a) => a.sys.id === thumbnailId);
    return asset ? `https:${asset.fields.file.url}` : undefined;
  }

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="z-10 w-full max-w-7xl items-center justify-between px-4 font-mono text-sm md:px-6">
        <h1 className="my-10 text-center text-5xl">Cari Artikel</h1>
        <SearchBar onSearch={handleSearch} />
        <h2 className="mx-2 mt-20 text-2xl underline">Hasil Pencarian:</h2>

        <div className="mt-6 grid grid-cols-1 place-items-center gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {searchResults.length > 0 ? (
            searchResults.map((article) => (
              <Link href={`/${article.fields.slug}`} key={article.sys.id}>
                <div className="mx-auto flex h-[380px] max-w-sm transform flex-col rounded-2xl bg-white p-6 shadow-lg transition-transform hover:scale-105 hover:shadow-2xl">
                  <div className="relative h-[200px] w-full overflow-hidden rounded-lg">
                    <Image
                      src={
                        getThumbnailUrl(article, assets) || "/default-image.jpg"
                      }
                      alt="thumbnail"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </div>
                  <div className="mt-4 flex flex-grow flex-col text-left">
                    <h2 className="line-clamp-2 text-lg font-semibold">
                      {article.fields.title}
                    </h2>
                    <p className="mt-1 text-sm font-light italic">
                      {new Date(article.fields.createdAt).toLocaleDateString()}{" "}
                      - {article.fields.author}
                    </p>
                    <p className="mt-2 line-clamp-3 text-sm">
                      {article.fields.description}
                    </p>
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

export default Search;

// import { appConfig } from "@/lib/config";
// import { Asset, ContentfulEntry } from "@/types/contentfultypes";
// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import SearchBar from "./SearchBar";

// const { accessToken, baseUrl, environmentId, spaceId } = appConfig;

// const Search = () => {
//   const [searchValue, setSearchValue] = useState("");
//   const handleSearch = (value: string) => {
//     console.log(value);
//     setSearchValue(value);
//   };
//   const [searchResults, setSearchResults] = useState<ContentfulEntry[]>([]);
//   useEffect(() => {
//     if (searchValue) {
//       fetchArticles(searchValue);
//     }
//   }, [searchValue]);

//   const fetchArticles = async (query: string) => {
//     try {
//       const response = await fetch(
//         `https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries?access_token=${accessToken}&query=${query}`
//       );
//       const data = await response.json();
//       setSearchResults(data.items);
//     } catch (error) {
//       console.error("Error fetching articles:", error);
//     }
//   };

//   function getThumbnailUrl(article: ContentfulEntry, assets: Asset[]): string | undefined {
//     const thumbnailId = article.fields.thumbnail.sys.id;
//     const asset = assets.find((a) => a.sys.id === thumbnailId);
//     return asset ? `https:${asset.fields.file.url}` : undefined;
//   }

//   return (
//     <div className="flex min-h-screen flex-col items-center justify-center">
//     <div className="fon-mono flex-inline z-10 w-full max-w-md items-center justify-between text-sm">
//       <h1 className="my-10 text-5xl">Cari Artikel</h1>
//       <SearchBar onSearch={handleSearch} />
//       <h2 className="mx-2 mt-20 text-2xl underline">Hasil Pencarian:</h2>

//       <div className="grid grid-cols-1 space-y-4 md:grid-cols-3 gap-6 mt-6">
//         {searchResults.length > 0 ? (
//           searchResults.map((article) => (
//             <Link href={`/${article.fields.slug}`} key={article.sys.id}>
//               <div className="mx-auto grid h-[350px] w-[300px] rounded-2xl bg-yellow-200 p-5 text-black shadow-lg">
//                 <div className="relative h-[100px] w-full overflow-hidden rounded-lg">
//                   <Image
//                     src={getThumbnailUrl(article, assets) || "/default-image.jpg"}
//                     alt="thumbnail"
//                     className="object-cover"
//                     fill
//                   />
//                 </div>
//                 <div className="text-left mt-4">
//                   <h2 className="line-clamp-2 text-lg font-semibold">{article.fields.title}</h2>
//                   <p className="text-sm font-light italic">
//                     {new Date(article.fields.createdAt).toLocaleDateString()} - {article.fields.author}
//                   </p>
//                   <p className="line-clamp-3 mt-2">{article.fields.description}</p>
//                 </div>
//               </div>
//             </Link>
//           ))
//         ) : (
//           <p className="text-gray-500 col-span-full text-center">Tidak ada hasil ditemukan</p>
//         )}
//       </div>
//     </div>
//   </div>
//     // <div className="flex min-h-screen flex-col items-center justify-center">
//     //   <div className="fon-mono flex-inline z-10 w-full max-w-md items-center justify-between text-sm">
//     //     <h1 className="my-10 text-5xl">Cari Artikel</h1>
//     //     <SearchBar onSearch={handleSearch} />
//     //     <h2 className="mx-2 mt-20 text-2xl underline">Search For;</h2>
//     //     <p className="text-2xl m-2">{searchValue}</p>
//     //   </div>
//     // </div>

//     // <div className="flex min-h-screen flex-col items-center justify-center">
//     //   <div className="fon-mono flex-inline z-10 w-full max-w-md items-center justify-between text-sm">
//     //     <h1 className="my-10 text-5xl">Cari Artikel</h1>
//     //     <SearchBar onSearch={handleSearch} />
//     //     <h2 className="mx-2 mt-20 text-2xl underline">Hasil Pencarian:</h2>
//     //     <div className="flex flex-col gap-4 mt-4">
//     //       {searchResults.length > 0 ? (
//     //         searchResults.map((article) => (
//     //           <div key={article.sys.id} className="p-4 border rounded-md">
//     //             <h3 className="text-xl font-bold">{article.fields.title}</h3>
//     //             <p>{article.fields.description}</p>
//     //           </div>
//     //         ))
//     //       ) : (
//     //         <p className="text-gray-500">Tidak ada hasil ditemukan</p>
//     //       )}
//     //     </div>
//     //   </div>
//     // </div>
//   );
// };

// export default Search;
