"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { getTopHeadlines } from "../headLine";
import styles from "./TopHeadlines.module.scss";

const TopHeadlines = () => {
  const dispatch = useDispatch<AppDispatch>();
  const articles = useSelector((state: RootState) => state.headlines.articles);
  const status = useSelector((state: RootState) => state.headlines.status);
  const error = useSelector((state: RootState) => state.headlines.error);

  useEffect(() => {
    dispatch(getTopHeadlines({ country: "us", category: "science" }));
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error: {error}</div>;
  }

  const articlesWithImages = articles.filter((article) => article.urlToImage);
  const articlesWithoutImages = articles.filter(
    (article) => !article.urlToImage
  );

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
