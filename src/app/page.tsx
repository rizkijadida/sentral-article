import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Posts from "./components/Posts";
import Search from "./components/Search";

export default function Home({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) {
  return (
    <main className="container">
      <div className="m-5 mx-auto grid items-center justify-center gap-10 text-center">
        <div className="grid-row mx-5 grid items-center justify-center text-center md:mx-10 md:h-[550px] md:grid-cols-2">
          <h1 className="p-10 font-semibold italic md:text-4xl">
            Uji kemampuanmu, tantang dirimu, dan raih prestasi tertinggi di
            Sentral Olimpiade
          </h1>
          <div className="item-center relative mx-auto mt-3 flex h-[300px] w-[300px] items-center justify-center overflow-hidden rounded-md md:h-full md:w-full md:rounded-lg">
            <Image
              src={"/images/home.jpg"}
              alt="thumbnail"
              className="object-cover"
              fill
            />
          </div>
        </div>

        <Search />

        <div className="md:mx-10 mt-10">
          <Separator className="bg-slate-800" />
        </div>

        {/* <CardPost /> */}
        <div className="md:mx-5">
          <Posts searchParams={searchParams} />
        </div>
      </div>
    </main>
  );
}
