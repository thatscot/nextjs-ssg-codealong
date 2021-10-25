import Head from 'next/head';
import API_URLS from '../constants/apis';
import ArticleList from '../components/article/ArticleList';

const Home = ({ articles }) => {
  return (
    <div>
      <Head>
        <title>Home | NextJS Boiler Plate</title>
      </Head>
      <h1>Welcome</h1>
      <ArticleList articles={articles} />
    </div>
  );
};

export const getStaticProps = async () => {
  const res = await fetch(API_URLS.getAllArticles).catch((reason) => {
    console.log(`Error with API call: ` + reason);
    return { notFound: true };
  });
  const articles = await res.json();

  return {
    props: { articles },
  };
};

export default Home;
