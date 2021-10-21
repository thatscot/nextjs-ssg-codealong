import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import About from '../pages/about';

describe('About page', () => {
  it('should render', () => {
    render(<About />);
    const header = screen.getByText('About');

    expect(header).toBeInTheDocument();
  });
});
