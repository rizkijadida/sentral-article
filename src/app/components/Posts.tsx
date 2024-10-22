import { fetchPosts } from '@/lib/api';
import PostsList from './PostsList';
import { PaginationWithLinks } from './PaginationWithLink';

interface PostsProps {
  searchParams: { [key: string]: string | undefined };
}
export default async function Posts({ searchParams }: PostsProps) {
  const currentPage = parseInt((searchParams.page as string) || '1');
  const postsPerPage = parseInt((searchParams.pageSize as string) || '5');

  const { posts, totalPosts } = await fetchPosts(currentPage, postsPerPage);

  return (
    <div className='m-10'>
      <h1 className='text-3xl font-bold mb-6'>Posts</h1>
      <PostsList posts={posts} />
      <div className='mt-8'>
        <PaginationWithLinks
          page={currentPage}
          pageSize={postsPerPage}
          totalCount={totalPosts}
          pageSizeSelectOptions={{
            pageSizeOptions: [5, 10, 25, 50],
          }}
        /> 
      </div>
    </div>
  );
}