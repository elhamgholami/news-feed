"use client";
// importing needed api service
import { useGetTopHeadlinesQuery } from "@/app/services/NewsApi";
//importing styles
import "@/app/TopHeadlines/components/index.scss";

function TopHeadlines() {
  const { data, error, isLoading, isSuccess } = useGetTopHeadlinesQuery({
    country: "us",
    category: "entertainment",
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  } else if (isSuccess && data) {
    const articlesWithImages = data.articles.filter(
      (article) => article.urlToImage
    );
    const articlesWithoutImages = data.articles.filter(
      (article) => !article.urlToImage
    );
    return (
      <div className="horizontalHeadlines">
        <div className="verticalHeadlines">
          {articlesWithImages.map((article, index) => (
            <div key={index} className="article">
              <h2 className="title">{article.title}</h2>
              <div className="content">
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="image"
                />
                <p className="description">{article.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="verticalHeadlines">
          {articlesWithoutImages.slice(0, 10).map((article, index) => (
            <div key={index} className="article">
              <div className="content">
                <h2 className="title">{article.title}</h2>
                <p className="description">{article.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default TopHeadlines;
