"use client";
// importing needed components from react
import { useState } from "react";
import InfiniteLoader from "react-window-infinite-loader";
import { FixedSizeList as List } from "react-window";

// importing TopHeadlines and Search component
import TopHeadlines from "@/app/TopHeadlines/components/index";
import Search from "@/app/Search/index";
// importing needed api service and type
import { SearchParams, useSearchArticlesQuery } from "@/app/services/NewsApi";
import { ToastContainer } from "react-toastify";

export default function App() {
  const [query, setQuery] = useState<SearchParams>({});
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useSearchArticlesQuery({
    searchParams: query,
    page,
  });

  const loadMoreItems = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const isItemLoaded = (index: number) => !!data?.articles[index];

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
            <InfiniteLoader
              isItemLoaded={isItemLoaded}
              itemCount={data.totalResults}
              loadMoreItems={loadMoreItems}
            >
              {({ onItemsRendered, ref }) => (
                <List
                  height={600} 
                  itemCount={data.articles.length}
                  itemSize={150}
                  onItemsRendered={onItemsRendered}
                  ref={ref}
                  width={"100%"}
                >
                  {({ index, style }) => {
                    const article = data.articles[index];
                    return article ? (
                      <div key={index} style={style} className="news-item">
                        <h2>{article.title}</h2>
                        <p>{article.description}</p>
                      </div>
                    ) : (
                      <div style={style}>Loading...</div>
                    );
                  }}
                </List>
                
              )}
              
            </InfiniteLoader>
          )}
           <button
                  onClick={loadMoreItems}
                  disabled={isLoading}
                  className="simple-button"
                >
                  {isLoading ? "Loading..." : "Load More"}
                </button>
        </section>
      </main>
    </>
  );
}
