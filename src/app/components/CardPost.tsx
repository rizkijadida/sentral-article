
"use client";

import { getEntries } from "@/app/api/getEntries";
import { findAsset } from "@/lib/findAssets";
import { useState } from "react";
import CardArticles from "./CardArticles";

const CardPost = async () => {


  const articles = await getEntries();
  return (
    <div className="container mx-auto">
      <section className="mx-auto grid max-w-screen-lg grid-cols-1 items-start justify-center gap-6 md:grid-cols-3">
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

      
    </div>
  );
};

export default CardPost;
