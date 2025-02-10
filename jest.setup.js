global.importMetaEnv = {
    VITE_FIREBASE_API_KEY: "test-api-key", // Mocked environment variable
    VITE_FIREBASE_AUTH_DOMAIN: "test-auth-domain",
  };
  
  Object.defineProperty(global, "import", {
    value: { meta: { env: global.importMetaEnv } },
  });