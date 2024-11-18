import { Separator } from "@/components/ui/separator";
import Posts from "../components/Posts";
import Search from "../components/Search";

interface ArticleProps {
  searchParams: { [key: string]: string | undefined };
}
export default async function Article({ searchParams }: ArticleProps) {
  return (
    <div className="container grid items-center text-center space-y-10">
      <Search />

      <div className="md:mx-5 mt-10">
        <Separator className="bg-slate-800" />
      </div>
      <div className="md:mx-5">
        <Posts searchParams={searchParams} />
      </div>
    </div>
  );
}
