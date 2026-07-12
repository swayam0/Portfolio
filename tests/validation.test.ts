import { POST } from '../app/api/operator/route';
import { NextRequest } from 'next/server';

describe('Operator Input Validation & Fallback', () => {
  const createMockReq = (body: any, headers = {}) => {
    return new NextRequest('http://localhost/api/operator', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: new Headers(headers)
    });
  };

  it('should reject empty input', async () => {
    const req = createMockReq({ query: '' });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.data).toContain('empty');
  });

  it('should reject inputs > 300 characters', async () => {
    const req = createMockReq({ query: 'a'.repeat(301) });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.data).toContain('exceeds maximum length');
  });

  it('should enforce rate limits', async () => {
    // Generate many requests to trigger rate limit (20 reqs limit)
    let res;
    for (let i = 0; i < 22; i++) {
      const req = createMockReq({ query: 'hello' }, { 'x-forwarded-for': '192.168.1.1' });
      res = await POST(req);
    }
    expect(res?.status).toBe(429);
  });
});
