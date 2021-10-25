import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Index, {
  getStaticPaths,
  getStaticProps,
} from '../pages/article/[id]/index';
import API_URLS from '../constants/apis';
import { act } from 'react-dom/test-utils';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Dynamic article page', () => {
  it('should render', () => {
    render(<Index article={testData} />);
    const title = screen.getByText('first article');
    const body = screen.getByText('body of the first entry');

    expect(title).toBeInTheDocument();
    expect(body).toBeInTheDocument();
  });

  it('should be accessible', async () => {
    await act(async () => {
      const { container } = render(<Index article={testData} />);
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });
  });
});

describe('getStaticProps with id', () => {
  window.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(testData),
    }),
  );

  it('should call the articles api with id', async () => {
    const response = await getStaticProps({ params: { id: testData.id } });
    expect(response).toEqual(
      expect.objectContaining({
        props: {
          article: [testData],
        },
      }),
    );
    expect(fetch).toHaveBeenCalledWith(API_URLS.getAllArticles + '/1');
  });
});

describe('getStaticPaths', () => {
  window.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([testData]),
    }),
  );

  it('should call the articles api and return correct path', async () => {
    const response = await getStaticPaths({ params: { id: testData.id } });
    expect(response).toEqual(
      expect.objectContaining({
        paths: [
          {
            params: { id: testData.id.toString() },
          },
        ],
        fallback: false,
      }),
    );
    expect(fetch).toHaveBeenCalledWith(API_URLS.getAllArticles);
  });
});

const testData = {
  id: 1,
  title: 'first article',
  body: 'body of the first entry',
};
