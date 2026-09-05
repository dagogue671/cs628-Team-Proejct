const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

async function parseResponse(response) {
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(data?.message || "Something went wrong.");
  }
  return data;
}

export async function getPosts(userId) {
  const query = userId ? `?userId=${userId}` : "";
  const response = await fetch(`${API_URL}/api/posts${query}`);
  return parseResponse(response);
}

export async function createPost({ authorId, content }) {
  const response = await fetch(`${API_URL}/api/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ authorId, content }),
  });
  return parseResponse(response);
}

export async function toggleLike(postId, userId) {
  const response = await fetch(`${API_URL}/api/posts/${postId}/like`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });
  return parseResponse(response);
}

export async function addComment(postId, { authorId, content }) {
  const response = await fetch(`${API_URL}/api/posts/${postId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ authorId, content }),
  });
  return parseResponse(response);
}
