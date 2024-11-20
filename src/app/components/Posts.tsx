import { fetchPosts } from "@/lib/fetchPosts";
import PostList from "./post-list";
import { PaginationWithLinks } from "./PaginationWithLink";

interface PostsProps {
  searchParams: { [key: string]: string | undefined };
}

export default async function Posts({ searchParams }: PostsProps) {
  const currentPage = parseInt((searchParams.page as string) || "1");
  const postsPerPage = parseInt((searchParams.pageSize as string) || "5");

  const { posts, totalPosts } = await fetchPosts(currentPage, postsPerPage);

  return (
    <div className="container mx-auto">
      <PostList posts={posts}/>
      <div className="mx-auto my-5 flex max-w-screen-lg grid-cols-1 items-center justify-center gap-6 md:grid-cols-3">
        <PaginationWithLinks
          page={currentPage}
          pageSize={postsPerPage}
          totalCount={totalPosts}
          pageSizeSelectOptions={{
            pageSizeOptions: [6, 12, 24, 36],
          }}
        />
      </div>
    </div>
  );
}
