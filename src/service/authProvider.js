// Pretend this is firebase, netlify, or auth0's code.

const localStorageKey = '__auth_user__';

async function getUser() {
  const userData = window.localStorage.getItem(localStorageKey);
  return JSON.parse(userData || '{}');
}

function handleUserResponse(user) {
  user.token = `${user.username}_token`;
  window.localStorage.setItem(localStorageKey, JSON.stringify(user));
  return user;
}

async function login({ username, password }) {
  return handleUserResponse({ username, password });
}

async function register({ username, password }) {
  return handleUserResponse({ username, password });
}

async function logout() {
  window.localStorage.removeItem(localStorageKey);
}

export { getUser, login, register, logout };
