import { jest } from '@jest/globals';

// fetchIt.ts mock
const fetchIt = jest.fn<(url: string) => Promise<{ json: () => Promise<unknown> }>>().mockImplementation((url: string) => {
  if (typeof url !== 'string') {
    return Promise.reject(new Error('URL must be a string'));
  }
  if (url.includes('fetchBlogPosts')) {
    return Promise.resolve({
      json: () => Promise.resolve({ /* mock data */ }),
    });
  }
  return Promise.reject(new Error('Unknown endpoint'));
});

export default fetchIt;