"use client";
import styles from "./TopHeadlines.module.scss";
import { useGetTopHeadlinesQuery } from "@/services/api";

function TopHeadlines() {
  const { data, error, isLoading, isSuccess } = useGetTopHeadlinesQuery({
    country: "us",
    category: "science",
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  } else if (isSuccess && data) {
    const articlesWithImages = data?.articles.filter(
      (article) => article.urlToImage
    );
    const articlesWithoutImages = data?.articles.filter(
      (article) => !article.urlToImage
    );
    return (
      <div className={styles.horizontalHeadlines}>
        <div className={styles.verticalHeadlines}>
          {articlesWithImages?.map((article, index) => (
            <div key={index} className={styles.article}>
              <h2 className={styles.title}>{article.title}</h2>
              <div className={styles.content}>
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className={styles.image}
                />
                <p className={styles.description}>{article.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.verticalHeadlines}>
          {articlesWithoutImages?.slice(0, 10).map((article, index) => (
            <div key={index} className={styles.article}>
              <div className={styles.content}>
                <h2 className={styles.title}>{article.title}</h2>
                <p className={styles.description}>{article.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default TopHeadlines;
