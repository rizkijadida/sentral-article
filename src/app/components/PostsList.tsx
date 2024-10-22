import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { post } from "@/types/types";

interface PostListProps {
  posts: post[];
}
export default function PostList({ posts }: PostListProps) {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <CardTitle>{`${post.title} (post ${post.id})`}</CardTitle>
          </CardHeader>
          <CardContent>{post.body}</CardContent>
        </Card>
      ))}
    </div>
  );
}
