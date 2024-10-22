import { getEntries } from "@/api/getEntries";
import { findAsset } from "@/lib/findAssets";
import CardArticles from "./CardArticles";
import { PaginationWithLinks } from "./PaginationWithLink";
import { fetchPosts } from "@/lib/api";


const CardPost = async () => {

  const articles = await getEntries();
  return (
    <div className="container mx-auto">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-center items-start max-w-screen-lg mx-auto">
        {articles.items.map((article, index) => {
          const assetId = article.fields.thumbnail?.sys.id;
          const assets = articles.includes.Asset;
          const image = findAsset(assetId, assets);
          return (
            <CardArticles
              key={index}
              slug={article.fields.slug}
              title={article.fields.title}
              author={article.fields.author}
              category={article.fields.category}
              createdAt={article.fields.createdAt}
              description={article.fields.description}
              imageUrl={`https:${image?.fields.file.url}`}
            />
          );
        })}
       
      </section>
    </div>
  );
};

export default CardPost;
