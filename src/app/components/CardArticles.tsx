import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

import React from "react";

interface CardArticlesProps {
  imageUrl: string;
  category: string;
  title: string;
  createdAt: string;
  author: string;
  description: string;
  slug: string;
}

const CardArticles: React.FC<CardArticlesProps> = ({
  author,
  category,
  title,
  createdAt,
  description,
  imageUrl,
  slug,
}) => {
  return (
    <Link href={`/${slug}`}>
      <Card className="grid w-[300px] h-[350px] bg-yellow-200 text-black rounded-2xl p-5 shadow-lg mx-auto">
        <CardHeader>
          <div className="relative h-[100px] w-full overflow-hidden rounded-lg">
            <Image
              src={imageUrl}
              alt="thumbnail"
              className="object-cover"
              fill
            />
          </div>
        </CardHeader>
        <CardContent className="text-left ">
          <h2 className="line-clamp-2 text-lg font-semibold">{title}</h2>
          <p className="text-sm font-light italic">24 Jan 2024 - {author}</p>
          <p className="line-clamp-3">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CardArticles;
