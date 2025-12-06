import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const handleLogin = async ({username, password}) => {
  const res = await api.post("/login", { username, password });
  return res.data;
};

const handleSignup = async (user) => {
  const res = await api.post("/signup", user);
  return res.data;
};

const logOut = async () => {
  const res = await api.post("/logout");
  return res.data;
};

const me = async () => {
  const res = await api.get("/me");
  return res.data;
};

export { handleLogin, handleSignup, logOut, me };
