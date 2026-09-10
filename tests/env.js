process.env.NODE_ENV = 'test';
process.env.JWT_SECRET ||= 'applyflow-test-secret';
process.env.JWT_EXPIRES_IN = '1d';
if (!process.env.TEST_DATABASE_URL) throw new Error('TEST_DATABASE_URL is required for tests');
