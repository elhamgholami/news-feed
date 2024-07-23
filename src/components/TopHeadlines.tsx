'use client';

import { useEffect, useState } from "react";
import axios from 'axios';

interface Article {
    title: string;
    description: string;
  }

const TopHeadlines = () =>
{
    const [articles, setArticles] = useState<Article[]>([]);
    useEffect(() => {
        const fetchTopHeadlines = async () => {
          try {
            const response = await axios.get('https://newsapi.org/v2/top-headlines', {
              params: {
                country: 'us',
                category: 'science',

                apiKey: '83ff284543f441809114d438ca5dc54b',
              },
            });
            setArticles(response.data.articles);
          } catch (error) {
            console.error('Error fetching top headlines:', error);
          } 
        };
    
        fetchTopHeadlines();
      }, []);
    return (
        <div>
          {articles.map((article, index) => (
            <div key={index}>
              <h2>{article.title}</h2>
              <p>{article.description}</p>
            </div>
          ))}
        </div>
      );
}
export default TopHeadlines;