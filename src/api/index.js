//kdk
const BASE_URL = 'https://app.sooprs.com/api/2/';

async function request(endpoint, method = 'POST', body = null) {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };
  if (body) options.body = JSON.stringify(body);

  const res = await fetch(BASE_URL + endpoint, options);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export const api = {
  login: (email, password) =>
    request('users/login', 'POST', { email, password }),

  register: (name, email, phone, password) =>
    request('users/register', 'POST', { name, email, phone, password }),

  forgotPassword: (phone) =>
    request('users/forgot-password', 'POST', { phone }),

  verifyOtp: (otp) =>
    request('users/verify-otp', 'POST', { otp }),

  resetPassword: (password) =>
    request('users/reset-password', 'POST', { password }),
};
