import { queryCache } from 'react-query';
import * as auth from 'service/authProvider';

async function client(endpoint, { data, query, token, headers: customHeaders, ...customConfig } = {}) {
  const config = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      'Content-Type': data ? 'application/json' : undefined,
      ...customHeaders,
    },
    ...customConfig,
  };

  if (query) {
    const queryString = Object.keys(query)
      .map(key => `${key}=${encodeURIComponent(query[key])}`)
      .join('&');
    endpoint = `${endpoint}?${queryString}`;
  }
  try {
    const response = await window.fetch(endpoint, config);
    if (response.status === 401) {
      queryCache.clear();
      await auth.logout();
      window.location.assign(window.location);
      const errData = { message: 'Please re-authenticate.' };
      throw errData;
    }
    const data = await response.json();

    if (response.ok) return data;
    else throw data;
  } catch (error) {
    throw error;
  }
}

export { client };
