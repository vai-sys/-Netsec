import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // Import path module for aliasing

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

});
