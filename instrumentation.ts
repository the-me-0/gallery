// import crypto from 'crypto';

const register = async () => {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    (await import('./instrumentation-node')).register();
  }
}

export { register };
