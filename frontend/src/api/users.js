const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

async function parseResponse(response) {
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(data?.message || "Something went wrong.");
  }
  return data;
}

export async function getUsers(excludeId) {
  const query = excludeId ? `?excludeId=${excludeId}` : "";
  const response = await fetch(`${API_URL}/api/users${query}`);
  return parseResponse(response);
}

export async function addFriend(userId, friendId) {
  const response = await fetch(`${API_URL}/api/users/${userId}/friends`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ friendId }),
  });
  return parseResponse(response);
}

export async function getFriends(userId) {
  const response = await fetch(`${API_URL}/api/users/${userId}/friends`);
  return parseResponse(response);
}

export async function removeFriend(userId, friendId) {
  const response = await fetch(`${API_URL}/api/users/${userId}/friends/${friendId}`, {
    method: "DELETE",
  });
  return parseResponse(response);
}
