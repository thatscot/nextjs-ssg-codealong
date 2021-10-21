import Link from 'next/link';
import API_URLS from '../../../constants/apis';

const article = ({ article }) => {
  return (
    <>
      <h1>{article.title}</h1>
      <p>{article.body}</p>
      <Link href="/">Go Back</Link>
    </>
  );
};

export const getStaticProps = async (context) => {
  const res = await fetch(API_URLS.getAllArticles + `/${context.params.id}`);
  const article = await res.json();

  return {
    props: {
      article,
    },
  };
};

export const getStaticPaths = async () => {
  const res = await fetch(API_URLS.getAllArticles).catch((reason) => {
    console.log(`Error with API call: ` + reason);
    return { notFound: true };
  });

  const articles = await res.json();

  const ids = articles.map((art) => art.id);
  const paths = ids.map((id) => ({ params: { id: id.toString() } }));

  return {
    paths,
    fallback: false,
  };
};

export default article;
