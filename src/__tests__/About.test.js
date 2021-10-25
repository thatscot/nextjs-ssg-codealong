import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import About from '../pages/about';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('About page', () => {
  it('should render', () => {
    render(<About />);
    const header = screen.getByText('About');

    expect(header).toBeInTheDocument();
  });

  it('should be accessible', async () => {
    const { container } = render(<About />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
