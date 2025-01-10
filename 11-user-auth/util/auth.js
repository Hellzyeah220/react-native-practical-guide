import axios from 'axios';

const API_KEY = 'AIzaSyCfEA8uwo18dYGLjMrFYeIcbzcZkCvXl94';

const authenticate = async (mode, email, password) => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  const response = await axios.post(
    url,
    {
      email,
      password,
      returnSecureToken: true
    },
    { timeout: 1000 }
  );

  const token = response.data.idToken;

  return token;
};

export const createUser = (email, password) => {
  return authenticate('signUp', email, password);
};

export const login = (email, password) => {
  return authenticate('signInWithPassword', email, password);
};
