import { getEntryBySlugEvent } from "@/app/api/getEntriesEventBySlug";
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
import Events from "../component/Events";

export interface EventDetailProps {
  params: {
    slug: string;
  };
}

const RICHTEXT_OPTIONS: Options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => (
      <p className="mb-4 whitespace-pre-line leading-relaxed tracking-wide text-gray-700 sm:mb-6 sm:text-base md:text-lg">
        {children}
      </p>
    ),
    [BLOCKS.HEADING_1]: (node, children) => (
      <h1 className="mb-4 text-2xl font-bold text-blue-900 sm:mb-6 sm:text-3xl md:text-4xl">
        {children}
      </h1>
    ),
    [BLOCKS.HEADING_2]: (node, children) => (
      <h2 className="mb-3 text-xl font-semibold text-blue-800 sm:mb-5 sm:text-2xl md:text-3xl">
        {children}
      </h2>
    ),
    [BLOCKS.UL_LIST]: (node, children) => (
      <ul className="mb-4 list-disc space-y-2 pl-5 sm:mb-6 sm:pl-6">
        {children}
      </ul>
    ),
    [BLOCKS.LIST_ITEM]: (node, children) => (
      <li className="flex items-start gap-2 text-gray-700 sm:gap-3">
        <span className="before:font-bold before:text-blue-500 before:content-['•']">
          {children}
        </span>
      </li>
    ),
    [INLINES.HYPERLINK]: (node, children) => {
      const { uri } = node.data;
      return (
        <a
          href={uri}
          className="text-blue-600 underline hover:text-blue-800 sm:text-sm md:text-base"
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
      <strong className="font-bold text-gray-900 sm:text-base md:text-lg">
        {text}
      </strong>
    ),
    [MARKS.ITALIC]: (text) => (
      <em className="italic text-gray-800 sm:text-sm md:text-base">{text}</em>
    ),
  },
};

const EventDetail: React.FC<EventDetailProps> = async ({ params }) => {
  const event = await getEntryBySlugEvent(params.slug);

  if (!event.items.length) {
    notFound();
  }

  const assetId = event.items[0].fields.poster.sys.id;
  const assets = event.includes.Asset;
  const image = findAssetEvent(assetId, assets);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="my-10 grid gap-y-10">
        <section className="space-y-5">
          <h1 className="text-2xl font-semibold md:text-4xl">
            {event.items[0].fields.title}
          </h1>

          <div className="relative mx-auto h-[200px] w-full max-w-[1000px] items-center justify-center rounded-3xl md:h-[500px]">
            <Image
              src={`https:${image?.fields.file.url}`}
              alt={image?.fields.title || "event poster"}
              fill
              className="rounded-3xl object-contain"
              priority
            />
          </div>

          <Badge
            variant="outline"
            className="mx-auto w-[100px] rounded-sm bg-indigo-300 text-center"
          >
            {event.items[0].fields.organizer}
          </Badge>
        </section>

        <article className="prose prose-blue mx-auto max-w-none px-4 sm:px-6 lg:px-8">
          {documentToReactComponents(
            event.items[0].fields.caption,
            RICHTEXT_OPTIONS,
          )}
        </article>

        <div className="mx-2">
          <Separator className="bg-black" />
        </div>

        <h1 className="text-center text-4xl font-semibold md:text-left">
          Event Lainnya
        </h1>
        <Events searchParams={params} />
      </div>
    </div>

    // <div className="container mx-auto">
    //   <div className="m-10 grid gap-y-10">
    //     <section className="gap-y-5">
    //       <h1 className="text-2xl font-semibold md:text-4xl">
    //         {event.items[0].fields.title}
    //       </h1>

    //       <p className="text-sm font-light italic">
    //         {format(new Date(event.items[0].sys.createdAt), "dd MMMM yyyy")}
    //       </p>

    //       <div className="relative mx-auto h-[200px] w-full max-w-[1000px] items-center justify-center rounded-3xl md:h-[500px]">
    //         <Image
    //           src={`https:${image?.fields.file.url}`}
    //           alt={image?.fields.title || "event poster"}
    //           fill
    //           className="object-contain"
    //           priority
    //         />
    //       </div>

    //       <Badge
    //         variant="outline"
    //         className="w-[100px] rounded-sm bg-orange-100"
    //       >
    //         {event.items[0].fields.organizer}
    //       </Badge>
    //     </section>

    //     <article className="prose prose-blue max-w-none">
    //       {documentToReactComponents(
    //         event.items[0].fields.caption,
    //         RICHTEXT_OPTIONS,
    //       )}
    //     </article>

    //     <div className="m-2">
    //       <Separator className="bg-black" />
    //     </div>

    //     <div>
    //       <h1 className="text-4xl font-semibold">Event Lainnya</h1>
    //       <Events searchParams={params} />
    //     </div>
    //   </div>
    // </div>
  );
};

export default EventDetail;
