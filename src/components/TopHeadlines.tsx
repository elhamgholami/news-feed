"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/TopHeadlines.module.scss";
interface Article {
  title: string;
  description: string;
  urlToImage: string;
}

const TopHeadlines = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const articlesWithImages = articles.filter((article) => article.urlToImage);
  const articlesWithoutImages = articles.filter(
    (article) => !article.urlToImage
  );
  useEffect(() => {
    const fetchTopHeadlines = async () => {
      try {
        const response = await axios.get(
          "https://newsapi.org/v2/top-headlines",
          {
            params: {
              country: "us",
              category: "science",

              apiKey: "83ff284543f441809114d438ca5dc54b",
            },
          }
        );
        setArticles(response.data.articles);
      } catch (error) {
        console.error("Error fetching top headlines:", error);
      }
    };

    fetchTopHeadlines();
  }, []);
  return (
    <div className={styles.horizontalHeadlines}>
      <div className={styles.verticalHeadlines}>
        {articlesWithImages.map((article, index) => (
          <div key={index} className={styles.article}>
            <img
              src={article.urlToImage}
              alt={article.title}
              className={styles.image}
            />
            <div className={styles.content}>
              <h2 className={styles.title}>{article.title}</h2>
              <p className={styles.description}>{article.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.verticalHeadlines}>
        {articlesWithoutImages.map((article, index) => (
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
};
export default TopHeadlines;
