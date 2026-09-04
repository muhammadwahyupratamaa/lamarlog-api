process.env.NODE_ENV = 'test';
process.env.JWT_SECRET ||= 'applyflow-test-secret';
if (!process.env.TEST_DATABASE_URL) throw new Error('TEST_DATABASE_URL is required for tests');
