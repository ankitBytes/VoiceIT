import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { handleSignup } from "../services/auth.js"; 
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const { setUser } = useAuth();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!form.username.trim() || !form.email.trim() || !form.password.trim()) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const data = await handleSignup(form);

      if (data?.user) {
        setUser(data.user);
      } else {
        alert("Invalid server response");
      }

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h4" fontWeight={"bold"} gutterBottom>
        Create Your Account
      </Typography>

      <Typography variant="body1" color="textSecondary" gutterBottom>
        Sign up to start managing your tasks effortlessly!
      </Typography>

      <form onSubmit={onSubmit} style={{ padding: "5vh 0" }}>
        <Box sx={{ padding: "1vh 0" }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Username"
            value={form.username}
            onChange={handleChange("username")}
          />
        </Box>

        <Box sx={{ padding: "1vh 0" }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Email"
            value={form.email}
            onChange={handleChange("email")}
          />
        </Box>

        <Box sx={{ padding: "1vh 0" }}>
          <TextField
            fullWidth
            type="password"
            variant="outlined"
            placeholder="Password"
            value={form.password}
            onChange={handleChange("password")}
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{ margin: "2vh 0" }}
        >
          {loading ? "Creating account..." : "Sign Up"}
        </Button>
      </form>
    </Box>
  );
};

export default Signup;
