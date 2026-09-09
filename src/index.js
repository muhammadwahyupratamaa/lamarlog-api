let app;

try {
  ({ default: app } = await import('./app.js'));
  console.info('ApplyFlow startup complete', { environment: process.env.NODE_ENV || 'development', node: process.version });
} catch (error) {
  console.error('ApplyFlow startup failed', {
    code: error?.code,
    name: error instanceof Error ? error.name : 'UnknownError',
    message: error instanceof Error ? error.message : 'Unknown startup error',
  });
  throw error;
}

export default app;
