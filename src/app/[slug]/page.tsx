import React from "react";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import {
  documentToReactComponents,
  Options,
} from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import { getEntryBySlug } from "@/api/getEntriesBySlug";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { findAsset } from "@/lib/findAssets";
import { getEntries } from "@/api/getEntries";
import CardArticles from "../components/CardArticles";

interface BlogDetailProps {
  params: {
    slug: string;
  };
}

const ArticleDetail: React.FC<BlogDetailProps> = async ({ params }) => {
  const article = await getEntryBySlug(params.slug);
  //   console.log(article.items[0].fields.content);

  if (!article.items.length) {
    notFound();
  }

  const assetId = article.items[0].fields.thumbnail.sys.id;
  const assets = article.includes.Asset;
  const image = findAsset(assetId, assets);

  const RICHTEXT_OPTIONS: Options = {
    renderNode: {
      [BLOCKS.HEADING_2]: (node, children) => {
        return (
          <h2 className="my-2 text-lg md:text-xl font-semibold">{children}</h2>
        );
      },
      [BLOCKS.PARAGRAPH]: (node, children) => {
        return <p className="md:text-lg font-light">{children}</p>;
      },
    },
  };

  const articles = await getEntries();

  return (
    <main className="container">
      <section className="grid m-10 gap-5">
        <div className="relative h-[200px] md:h-[400px] w-full ">
          <Image
            src={`https:${image?.fields.file.url}`}
            alt="thumbnail"
            fill
            className="object-cover rounded-xl"
          />
        </div>
        <Badge variant="outline" className="rounded-sm bg-green-100 w-[50px]">
          {article.items[0].fields.category}
        </Badge>

        <h1 className="2xl md:text-4xl font-semibold">
          {article.items[0].fields.title}
        </h1>
        <p className="text-sm font-light italic">
          {format(new Date(article.items[0].fields.createdAt), "dd MMMM yyyy")}{" "}
          - {article.items[0].fields.author}
        </p>
      </section>

      {/* <Content></Content> */}
      <section className="grid m-10">
        {documentToReactComponents(
          article.items[0].fields.content,
          RICHTEXT_OPTIONS
        )}
      </section>

      <div className="grid bg-white p-10 gap-10 ">
        <h1 className="font-bold text-xl ml-32">Related Article</h1>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-center items-start max-w-screen-lg mx-auto">
          {articles.items.slice(0, 3).map((article, index) => {
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
    </main>
  );
};

export default ArticleDetail;
