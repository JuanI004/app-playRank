export const API_URL =
  import.meta.env.API_URL || "http://127.0.0.1:3000/api/v1";

export function authHeader() {
  const token = localStorage.getItem("token");
  return token
    ? { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
    : {};
}
