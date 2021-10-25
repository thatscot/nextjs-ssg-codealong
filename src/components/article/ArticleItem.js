import articleStyles from './Article.module.css';
import Link from 'next/link';

const ArticleItem = ({ article }) => {
  return (
    <Link href="/article/{id}" as={`/article/${article.id}`}>
      <a className={articleStyles.card}>
        <h2>{article.title}</h2>
        <p>{article.body}</p>
      </a>
    </Link>
  );
};
export default ArticleItem;
