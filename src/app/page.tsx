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
import SubmitButton from "./buttons";

export default function App() {
  const [query, setQuery] = useState<SearchParams>({});
  const [page, setPage] = useState(1);
  const isQueryEmpty = (query: SearchParams) => {
    return (
      !query ||
      Object.keys(query).length === 0 ||
      Object.values(query).every((value) => !value || value.length === 0)
    );
  };
  const { data, error, isLoading } = useSearchArticlesQuery(
    { searchParams: query, page },
    { skip: isQueryEmpty(query) }
  );

  const loadMoreItems = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const isItemLoaded = (index: number) => !!data?.articles[index];

  const articles = data?.articles.filter(
    (article) => article.title != "[Removed]"
  );
  const totalResults = data?.totalResults ? data.totalResults : 0;

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
          {articles && articles.length !== 0 && (
            <InfiniteLoader
              isItemLoaded={isItemLoaded}
              itemCount={totalResults}
              loadMoreItems={() => {}}
            >
              {({ onItemsRendered, ref }) => (
                <List
                  height={600}
                  itemCount={articles.length}
                  itemSize={150}
                  onItemsRendered={onItemsRendered}
                  ref={ref}
                  width={"100%"}
                  className="search-result"
                >
                  {({ index, style }) => {
                    const article = articles[index];
                    return (
                      <div key={index} style={style} className="news-item">
                        <h2>{article.title}</h2>
                        <p>{article.description}</p>
                      </div>
                    );
                  }}
                </List>
              )}
            </InfiniteLoader>
          )}
          <SubmitButton onClick={loadMoreItems} disabled={isLoading}>
            {isLoading ? "Loading..." : "Load More"}
          </SubmitButton>
        </section>
      </main>
    </>
  );
}
