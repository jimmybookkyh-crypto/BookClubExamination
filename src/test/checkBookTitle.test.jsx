import { describe, it, expect, vi, beforeEach } from 'vitest';
import checkBookTitle from '../utils/checkBookTitle';

describe('checkBookTitle', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  it('returns true when title already exists', async () => {
    fetch.mockResolvedValue({
      json: async () => ({
        data: [{ id: 1, title: 'Harry Potter' }]
      })
    });

    const result = await checkBookTitle('Harry Potter');

    expect(result).toBe(true);
  });

  it('returns false when title does not exist', async () => {
    fetch.mockResolvedValue({
      json: async () => ({
        data: []
      })
    });

    const result = await checkBookTitle('Unknown Book');

    expect(result).toBe(false);
  });

});