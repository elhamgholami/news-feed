"use client";
import TopHeadlines from "@/app/TopHeadlines/components/TopHeadlines";
import { useSearchArticlesQuery } from "@/app/services/NewsApi";
import { useState } from "react";
import Search from "@/app/Search/index";

export default function App() {
  const [query, setQuery] = useState("");
  const { data, error, isLoading, isSuccess } = useSearchArticlesQuery({
    q: query,
  });

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <section className="search-container">
          <h1>Top Headlines</h1>
          <TopHeadlines />
        </section>
        <section className="search-section">
          <Search setSearchQuery={setQuery} />
        </section>

        <section className="articles-list">
          {isLoading && <p>Loading...</p>}
          {error && <p>Error fetching articles.</p>}
          {data && data.articles.length !== 0 && (
            <div className="article">
              {data.articles.map((article, index) => (
                <div key={index} className="news-item">
                  <h2>{article.title}</h2>
                  <p>{article.description}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
