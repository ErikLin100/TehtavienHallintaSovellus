const auth = {
    currentUser: null,
    signInWithEmailAndPassword: jest.fn(),
    signInWithPopup: jest.fn()
  };
  
  const provider = {
    addScope: jest.fn()
  };
  
  const db = {
    collection: jest.fn()
  };
  
  module.exports = {
    auth,
    provider,
    db
  };