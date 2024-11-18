"use client"
import { getEntries } from "@/app/api/getEntries";
import { findAsset } from "@/lib/findAssets";
import { useState } from "react";
import CardArticles from "./CardArticles";

const CardPost = async () => {
  const [page, setPage] = useState<number>(1);

  const articles = await getEntries();
  return (
    <div className="container mx-auto">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-center items-start max-w-screen-lg mx-auto">
        {articles.items.map((article, index) => {
          const assetId = article.fields.thumbnail?.sys.id;
          const assets = articles.includes.Asset;
          const image = findAsset(assetId, assets);
          return (
            <CardArticles
              key={index}
              slug={article.fields.slug}
              title={article.fields.title}
              author={article.fields.author}
              category={article.fields.category}
              createdAt={article.fields.createdAt}
              description={article.fields.description}
              imageUrl={`https:${image?.fields.file.url}`}
            />
          );
        })}
      </section>

      {/* <div className="w-fit mx-auto">
        <Pagination
          total={meta?.total || 0}
          take={meta?.take || 0}
          onChangePage={handleChangePaginate}
        />
      </div> */}
    </div>
  );
};

export default CardPost;
