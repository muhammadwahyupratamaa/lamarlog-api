process.env.NODE_ENV = 'test';
process.env.JWT_SECRET ||= 'applyflow-test-secret';
process.env.TEST_DATABASE_URL ||= 'postgres://applyflow:applyflow_dev_password@localhost:5435/applyflow_test';
