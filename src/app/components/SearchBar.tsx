"use client";
import Link from "next/link";
import { useState } from "react";

export interface Article {
  id: number;
  title: string;
  description: string;
  link: string;
}

const SearchBar = () => {

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Article[]>([]);
  const [error, setError] = useState(false);
  const [isSearchExecuted, setIsSearchExecuted] = useState(false); // Tambahkan state ini

  // Contoh data artikel
  const articles: Article[] = [
    {
      id: 1,
      title: "Learn Next.js",
      description: "Tutorial about Next.js",
      link: "/articles/nextjs",
    },
    {
      id: 2,
      title: "React vs Vue",
      description: "Comparison between React and Vue",
      link: "/articles/react-vs-vue",
    },
    {
      id: 3,
      title: "JavaScript Tips",
      description: "Some useful JavaScript tips",
      link: "/articles/js-tips",
    },
    {
      id: 4,
      title: "TypeScript Guide",
      description: "Complete guide to TypeScript",
      link: "/articles/typescript-guide",
    },
  ];

  const handleSearch = () => {
    setIsSearchExecuted(true); // Set state ini ke true saat search dilakukan

    const filteredArticles = articles.filter(
      (article) =>
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.description.toLowerCase().includes(query.toLowerCase())
    );

    if (filteredArticles.length === 0) {
      setError(true);
      setResults([]);
      setError(false);
      setResults(filteredArticles);
    }
  };

  return (
 

    <div className="p-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search articles..."
        className="border p-2 rounded-xl"
      />
      <button
        onClick={handleSearch}
        className="ml-2 bg-green-700 text-white p-2 rounded-xl"
      >
        Search
      </button>

      {/* Menampilkan error atau hasil pencarian secara statis */}
      {isSearchExecuted ? (
        error ? (
          <div className="mt-4 text-red-500">
            No results found for "<strong>{query}</strong>".
          </div>
        ) : (
          <div className="mt-4">
            {results.map((article) => (
              <div key={article.id} className="p-2 border-b">
                <h2 className="text-xl font-bold">{article.title}</h2>
                <p>{article.description}</p>
                <Link href={article.link} className="text-blue-500">
                  Read more
                </Link>
              </div>
            ))}
          </div>
        )
      ) : // Tidak menampilkan apapun sebelum pencarian dilakukan
      null}
    </div>
  );
};

export default SearchBar;
