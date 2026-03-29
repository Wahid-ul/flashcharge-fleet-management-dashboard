import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";

// Toast notifications
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!");
    } catch (err) {
      toast.error("Login failed");
      console.error(err);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: "#0f172a",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          width: 350,
          borderRadius: 3,
          backgroundColor: "#1e293b",
        }}
      >
        <Typography
          variant="h5"
          sx={{ color: "#22c55e", marginBottom: 3, textAlign: "center" }}
        >
          ⚡ Fleet Manager Login
        </Typography>

        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            style: { color: "white" },
          }}
          InputLabelProps={{
            style: { color: "#94a3b8" },
          }}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            style: { color: "white" },
          }}
          InputLabelProps={{
            style: { color: "#94a3b8" },
          }}
        />

        <Button
          fullWidth
          variant="contained"
          onClick={handleLogin}
          sx={{
            marginTop: 2,
            backgroundColor: "#22c55e",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#16a34a",
            },
          }}
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;