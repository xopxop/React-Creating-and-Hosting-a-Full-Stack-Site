import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NotFoundPage from './NotFoundPage';
import articles from './article-content';

const ArticlesPage = () => {
  const [ articleInfo, setArticleInfo ] = useState({ upvotes: 0, comments: [] });
  const { articleId } = useParams();
  
  useEffect(() => {
    const loadArticleInfo = async () => {
      const response = await axios.get(`http://localhost:8000/api/articles/${articleId}`);
      const newArticleInfo = response.data;
      setArticleInfo(newArticleInfo);
    }
    loadArticleInfo();
  }, []);

  const article = articles.find(article => article.name === articleId);
  if (!article) {
    return <NotFoundPage />
  }
  return (
    <>
      <h1>{article.title}</h1>
      <p>This article has {articleInfo.upvotes} upvote(s)</p>
      {article.content.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </>
  );
}
export default ArticlesPage;