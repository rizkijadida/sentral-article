import { getEntryTestimoniBySlug } from "@/app/api/getEntryTestimoniBySlug";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { findAssetEvent } from "@/lib/findAssetEvent";
import {
    documentToReactComponents,
    Options,
} from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import { format } from "date-fns";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import Testimoni from "../page";

export interface TestimoniDetailProps {
  params: {
    slug: string;
  };
}

const RICHTEXT_OPTIONS: Options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => (
      <p className="mb-6 whitespace-pre-line leading-relaxed tracking-wide text-gray-700">
        {children}
      </p>
    ),
    [BLOCKS.HEADING_1]: (node, children) => (
      <h1 className="mb-6 text-3xl font-bold text-blue-900 md:text-4xl">
        {children}
      </h1>
    ),
    [BLOCKS.HEADING_2]: (node, children) => (
      <h2 className="mb-4 text-2xl font-semibold text-blue-800 md:text-3xl">
        {children}
      </h2>
    ),
    [BLOCKS.UL_LIST]: (node, children) => (
      <ul className="mb-6 list-none space-y-2">{children}</ul>
    ),
    [BLOCKS.LIST_ITEM]: (node, children) => (
      <li className="flex items-center gap-2 before:font-bold before:text-blue-500 before:content-['•']">
        <span className="text-gray-700">{children}</span>
      </li>
    ),
    [INLINES.HYPERLINK]: (node, children) => {
      const { uri } = node.data;
      return (
        <a
          href={uri}
          className="text-blue-600 underline hover:text-blue-800"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    },
  },
  renderMark: {
    [MARKS.BOLD]: (text) => (
      <strong className="font-bold text-gray-900">{text}</strong>
    ),
    [MARKS.ITALIC]: (text) => <em className="italic text-gray-800">{text}</em>,
  },
};

const TestimoniDetail: React.FC<TestimoniDetailProps> = async ({ params }) => {
  const event = await getEntryTestimoniBySlug(params.slug);

  if (!event.items.length) {
    notFound();
  }

  const assetId = event.items[0].fields.fotoPeserta.sys.id;
  const assets = event.includes.Asset;
  const image = findAssetEvent(assetId, assets);

  return (
    <div className="container">
      <div className="m-10 grid gap-y-10">
        <section className="grid gap-y-5">
          <h1 className="text-2xl font-semibold md:text-4xl">
            {event.items[0].fields.title}
          </h1>

          <p className="text-sm font-light italic">
            {format(new Date(event.items[0].sys.createdAt), "dd MMMM yyyy")}
          </p>

          <div className=" relative mx-auto h-[200px] w-full max-w-[1000px] items-center justify-center rounded-3xl md:h-[300px] ">
            <Image
              src={`https:${image?.fields.file.url}`}
              alt={image?.fields.title || "event poster"}
              fill
              className="object-contain "
              priority
            />
          </div>
          <Badge
            variant="outline"
            className="h-[50px] md:w-[200px] w-[150px] rounded-xl bg-amber-500"
          >
            {event.items[0].fields.sender}
          </Badge>
        </section>

        <article className="prose prose-blue max-w-none">
          {documentToReactComponents(
            event.items[0].fields.content,
            RICHTEXT_OPTIONS,
          )}
        </article>

        <div className="m-2">
          <Separator className="bg-black" />
        </div>

        <div>
          <h1 className="text-4xl font-semibold">Testimoni Lainnya</h1>
          <Testimoni searchParams={params}/>
        </div>
      </div>
    </div>
  );
};

export default TestimoniDetail;
