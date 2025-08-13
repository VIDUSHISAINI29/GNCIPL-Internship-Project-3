const API_URL = import.meta.env.VITE_BACKEND_URL;

export async function signupUser(data) {
  const res = await fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const resData = await res.json();

  if (!res.ok) {
    throw new Error(resData.message || 'Signup failed');
    console.log('hh ',res.data.message)
  }

  return resData; // should have { token: "..." }
}

export async function loginUser(data) {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || 'Login failed');
  }

  return json; // Successful login data
}
