"use client";
// importing needed components from react
import { useState } from "react";
// importing TopHeadlines and Search component
import TopHeadlines from "@/app/TopHeadlines/components/index";
import Search from "@/app/Search/index";
// importing needed api service and type
import { SearchParams, useSearchArticlesQuery } from "@/app/services/NewsApi";
import { ToastContainer } from "react-toastify";

export default function App() {
  const [query, setQuery] = useState<SearchParams>({});
  const { data, error, isLoading } = useSearchArticlesQuery({
    searchParams: query,
  });

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ToastContainer position="top-right" />
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
