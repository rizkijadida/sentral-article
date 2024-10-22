import { getEntries } from "@/api/getEntries";
import { findAsset } from "@/lib/findAssets";
import CardArticles from "../components/CardArticles";
import { PaginationWithLinks } from "../components/PaginationWithLink";

const article = async () => {
  const articles = await getEntries();

  return (
    <main className="container  mx-auto py-8">
      
      <section className="grid md:grid-cols-3 gap-6 justify-center items-start max-w-screen-lg mx-auto">
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

    </main>
  );
};

export default article;
