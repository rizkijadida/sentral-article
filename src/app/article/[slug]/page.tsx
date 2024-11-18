import { getEntryBySlug } from "@/app/api/getEntryBySlug";
import Posts from "@/app/components/Posts";
import { Badge } from "@/components/ui/badge";
import { findAsset } from "@/lib/findAssets";
import {
  documentToReactComponents,
  Options,
} from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import { format } from "date-fns";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

export interface ArticleDetailProps {
  params: {
    slug: string;
  };
}

const ArticleDetail: React.FC<ArticleDetailProps> = async ({ params }) => {
  const article = await getEntryBySlug(params.slug);
  // console.log(article.items[0].fields.content);

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
          <h2 className="my-2 text-lg font-semibold md:text-xl">{children}</h2>
        );
      },
      [BLOCKS.PARAGRAPH]: (node, children) => {
        return <p className="font-light md:text-lg">{children}</p>;
      },
    },
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="my-10 grid gap-y-10">
        <section className="grid gap-y-5 text-center md:text-left">
          <Badge
            variant="outline"
            className="mx-auto w-[100px] rounded-sm bg-green-100 md:mx-0"
          >
            {article.items[0].fields.category}
          </Badge>

          <h1 className="text-2xl font-semibold md:text-4xl">
            {article.items[0].fields.title}
          </h1>

          <p className="text-sm font-light italic">
            {format(
              new Date(article.items[0].fields.createdAt),
              "dd MMMM yyyy",
            )}{" "}
            - {article.items[0].fields.author}
          </p>

          <div className="relative mx-auto h-[200px] w-full max-w-[800px] rounded-3xl md:h-[400px]">
            <Image
              src={`https:${image?.fields.file.url}`}
              alt="thumbnail"
              fill
              className="rounded-3xl object-cover"
            />
          </div>
        </section>

        <section className="grid space-y-5 px-4 sm:px-6 lg:px-8">
          {documentToReactComponents(
            article.items[0].fields.content,
            RICHTEXT_OPTIONS,
          )}
        </section>

        <section>
          <Posts searchParams={params} />
        </section>
      </div>
    </div>

    // <div className="container">
    //   <div className="m-10 grid gap-y-10">
    //     <section className="grid gap-y-5">
    //       <Badge
    //         variant="outline"
    //         className="w-[100px] rounded-sm bg-green-100"
    //       >
    //         {article.items[0].fields.category}
    //       </Badge>
    //       <h1 className="2xl font-semibold md:text-4xl">
    //         {article.items[0].fields.title}
    //       </h1>
    //       <p className="text-sm font-light italic">
    //         {format(
    //           new Date(article.items[0].fields.createdAt),
    //           "dd MMMM yyyy",
    //         )}{" "}
    //         - {article.items[0].fields.author}
    //       </p>

    //       <div className="relative h-[200px] w-full rounded-3xl md:h-[400px]">
    //         <Image
    //           src={`https:${image?.fields.file.url}`}
    //           alt="thumbnail"
    //           fill
    //           className="object-cover"
    //         />
    //       </div>
    //     </section>

    //     {/* <Content></Content> */}
    //     <section className="grid space-y-5">
    //       {documentToReactComponents(
    //         article.items[0].fields.content,
    //         RICHTEXT_OPTIONS,
    //       )}
    //     </section>
    //     <section>
    //         <Posts searchParams={params}/>
    //     </section>
    //   </div>
    // </div>
  );
};

export default ArticleDetail;
