const { build } = require('vite');
const { spawn } = require('child_process');
const path = require('path');

async function buildApp() {
  // Build frontend
  await build({
    build: {
      outDir: 'dist/client'
    }
  });

  // Build backend
  const tsc = spawn('npx', ['tsc', '-p', 'server/tsconfig.json'], {
    stdio: 'inherit'
  });

  tsc.on('close', (code) => {
    if (code === 0) {
      console.log('Build completed successfully');
    } else {
      console.error('Build failed with code', code);
    }
  });
}

buildApp();