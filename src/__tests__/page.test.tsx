
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Ensure this is imported to use toBeInTheDocument
import HomePage from '../app/page'; // Adjust the import as necessary
import { jest, beforeEach, describe, it, expect } from '@jest/globals';

jest.mock('../netlify/functions/fetchIt'); // Mock the Netlify function
jest.mock('../prisma'); // Mock prisma if needed

describe('HomePage Component', () => {
  beforeEach(() => {
    const fetchIt = require('../netlify/functions/fetchIt'); // Ensure the mock is used
    fetchIt.mockResolvedValue({
      json: jest.fn().mockResolvedValue({ /* mock data */ }),
    });
  });

  it('renders the page content', async () => {
    render(<HomePage searchParams={{}} />);
    const element = await screen.findByText(/some text that should be on the page/i);
    expect(element).toBeInTheDocument();
  });
});
