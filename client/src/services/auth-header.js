export default function authHeader() {
  const user = localStorage.getItem("user");
  if (user && user.token) {
    return { "x-auth-token": user.token };
  } else {
    return {};
  }
}
