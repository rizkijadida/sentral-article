
import { testimoniType } from "@/types/testimoniTypes";
import Image from "next/image";
import Link from "next/link";

interface TestimoniListProps {
  testimonis: testimoniType[];
}
export default function TestimoniList({ testimonis }: TestimoniListProps) {
  return (
    <div className="grid grid-cols-1 gap-6 px-4 py-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {testimonis.map((testimoni) => (
        <Link href={`/testimoni/${testimoni.slug}`} key={testimoni.id}>
          <div className="mx-auto flex h-[380px] max-w-sm transform flex-col rounded-2xl bg-white p-6 shadow-lg transition-transform hover:scale-105 hover:shadow-2xl">
            <div className="relative mb-4 h-[200px] w-full overflow-hidden rounded-lg">
              <Image
                src={testimoni.fotoPeserta}
                alt="thumbnail"
                className="h-full w-full object-cover"
                fill
              />
            </div>
            <div className="flex-grow text-left">
              <h2 className="mb-2 line-clamp-2 text-xl font-semibold text-gray-900">
                {`${testimoni.title} (post ${testimoni.id})`}
              </h2>
              <p className="mb-3 text-sm italic text-gray-600">
                {testimoni.date} - {testimoni.sender}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
