import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

const Login = ({ setUserAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Hardcoded credentials for demo purposes
    const validUsername = "user";
    const validPassword = "password";

    if (username === validUsername && password === validPassword) {
      setUserAuthenticated(true);
      localStorage.setItem("userAuthenticated", "true");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <Box sx={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h4" fontWeight={"bold"} gutterBottom>
        Welcome Back!
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        We're excited to see you again. Please log in to continue managing your
        tasks and stay productive!
      </Typography>
      <form onSubmit={handleLogin} style={{ padding: "5vh 0" }}>
        <Box sx={{ padding: "1vh 0" }}>
          <TextField
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            variant="outlined"
            placeholder="Username"
          />
        </Box>
        <Box>
          <TextField
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            placeholder="Password"
          />
        </Box>
        <Button type="submit" sx={{ margin: "2vh 0" }}>
          Login
        </Button>
      </form>
    </Box>
  );
};

export default Login;