import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Index, { getStaticProps } from '../pages/index';
import API_URLS from '../constants/apis';
import { act } from 'react-dom/test-utils';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Index page should render correctly', () => {
  it('should render the articles', () => {
    render(<Index articles={testData} />);
    const article1Title = screen.getByText('first article');
    const article1Body = screen.getByText('body of the first entry');

    expect(article1Title).toBeInTheDocument();
    expect(article1Body).toBeInTheDocument();

    const article2Title = screen.getByText('second article');
    const article2Body = screen.getByText('body of the second entry');

    expect(article2Title).toBeInTheDocument();
    expect(article2Body).toBeInTheDocument();

    const links = screen.getAllByRole('link');

    expect(links.length).toBe(testData.length);

    links.forEach((link) => {
      expect(expectedHrefs.includes(link.href)).toBeTruthy();
    });
  });

  it('should render the correct hrefs', () => {
    render(<Index articles={testData} />);
    const links = screen.getAllByRole('link').map((link) => link.href);

    expect(links.length).toBe(testData.length);

    expectedHrefs.forEach((href) => {
      expect(links.includes(href)).toBeTruthy();
    });
  });

  it('should be accessible', async () => {
    await act(async () => {
      const { container } = render(<Index articles={testData} />);
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });
  });
});

describe('getStaticProps', () => {
  window.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(testData),
    }),
  );

  it('should call the articles api', async () => {
    const response = await getStaticProps();
    expect(response).toEqual(
      expect.objectContaining({
        props: {
          articles: testData,
        },
      }),
    );
    expect(fetch).toHaveBeenCalledWith(API_URLS.getAllArticles);
  });
});

const testData = [
  {
    id: 1,
    title: 'first article',
    body: 'body of the first entry',
  },
  {
    id: 2,
    title: 'second article',
    body: 'body of the second entry',
  },
];
const expectedHrefs = [
  'http://localhost/article/1',
  'http://localhost/article/2',
];
