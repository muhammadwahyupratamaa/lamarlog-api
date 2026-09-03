import request from 'supertest';
import app from '../src/app.js';

const register = async (email = `user-${Date.now()}-${Math.random()}@example.com`) => {
  const response = await request(app).post('/api/auth/register').send({ name: 'Test User', email, password: 'password123', confirmPassword: 'password123' });
  return response.body.data;
};
const auth = (token) => ({ Authorization: `Bearer ${token}` });
const application = (token, overrides = {}) => request(app).post('/api/applications').set(auth(token)).send({ companyName: 'Acme', jobTitle: 'Engineer', appliedAt: '2026-09-03', ...overrides });

test('health endpoint', async () => expect((await request(app).get('/api/health')).status).toBe(200));

test('register, duplicate email, and login', async () => {
  const email = 'user@example.com'; const created = await register(email);
  expect(created.user).not.toHaveProperty('passwordHash'); expect(created.token).toBeTruthy();
  expect((await request(app).post('/api/auth/register').send({ name: 'Again', email, password: 'password123', confirmPassword: 'password123' })).status).toBe(409);
  expect((await request(app).post('/api/auth/login').send({ email, password: 'password123' })).status).toBe(200);
  expect((await request(app).post('/api/auth/login').send({ email, password: 'wrong' })).status).toBe(401);
});

test('protected endpoints reject missing token', async () => expect((await request(app).get('/api/applications')).status).toBe(401));

test('users cannot access another user application', async () => {
  const owner = await register('owner@example.com'); const other = await register('other@example.com'); const created = await application(owner.token);
  expect((await request(app).get(`/api/applications/${created.body.data.id}`).set(auth(other.token))).status).toBe(404);
});

test('create application, status history, and dashboard summary', async () => {
  const user = await register(); const created = await application(user.token, { nextFollowUpAt: '2026-09-03' });
  expect(created.status).toBe(201); expect(created.body.data.status).toBe('APPLIED');
  expect((await request(app).post(`/api/applications/${created.body.data.id}/status`).set(auth(user.token)).send({ status: 'INTERVIEW' })).status).toBe(200);
  expect((await request(app).get(`/api/applications/${created.body.data.id}/history`).set(auth(user.token))).body.data).toHaveLength(2);
  const summary = await request(app).get('/api/dashboard/summary').set(auth(user.token));
  expect(summary.body.data).toMatchObject({ total: 1, active: 1, interview: 1, followUpDue: 1 });
});
