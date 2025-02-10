// src/setupTests.js
require('@testing-library/jest-dom');
const { TextEncoder, TextDecoder } = require('util');

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock import.meta
global.import = {};
global.import.meta = {
  env: {
    VITE_FIREBASE_API_KEY: 'mock-api-key',
    VITE_FIREBASE_AUTH_DOMAIN: 'mock-auth-domain',
    VITE_FIREBASE_PROJECT_ID: 'mock-project-id',
    VITE_FIREBASE_STORAGE_BUCKET: 'mock-storage-bucket',
    VITE_FIREBASE_MESSAGING_SENDER_ID: 'mock-sender-id',
    VITE_FIREBASE_APP_ID: 'mock-app-id',
    MODE: 'test'
  }
};

// Mock firebase auth state hook
jest.mock('react-firebase-hooks/auth', () => ({
  useAuthState: jest.fn()
}));

// Mock firebase/auth
jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(),
  signInWithPopup: jest.fn(),
  getAuth: jest.fn()
}));