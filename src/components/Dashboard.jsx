import { useState } from "react";
import { useChargers } from "../hooks/useChargers";
import { optimizeGrid } from "../services/optimizeLogic";
import { db, auth } from "../services/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { toast } from 'react-toastify';

// MUI
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";

// Animation
import { motion } from "framer-motion";

function Dashboard() {
  const chargers = useChargers();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMd = useMediaQuery((theme) => theme.breakpoints.up('md'));

  const user = auth.currentUser;

  // 🔥 Total Power
  const totalPower = chargers.reduce(
    (sum, c) => sum + c.currentPowerKW,
    0
  );

  // ⚙️ Optimize
  const handleOptimize = async () => {
    try {
      const result = optimizeGrid(chargers);

      if (!result) {
        toast.info("Grid is already under 100kW");
        return;
      }

      await updateDoc(doc(db, "stations", result.id), {
        currentPowerKW: result.newPower,
        lastUpdated: new Date().toISOString(),
      });

      toast.success("Grid optimized successfully!");
    } catch (error) {
      toast.error("Failed to optimize grid. Please try again.");
      console.error("Optimize error:", error);
    }
  };

  // 🔐 Logout
  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Box sx={{ backgroundColor: "#0f172a", minHeight: "100vh", color: "white" }}>
        <AppBar position="static" sx={{ backgroundColor: "#020617" }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              ⚡ FlashCharge
            </Typography>
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} color="inherit">
              <AccountCircle />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
              <MenuItem disabled>{user?.email}</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        <Box sx={{ width: "100%", maxWidth: 1280, mx: "auto", p: 4, overflowX: "hidden" }}>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 3,
                width: "85%",
                overflowX: "hidden",
              }}
            >
              <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start", // keep left aligned
                mt: 3, // your slight downward shift
                order: { xs: 4, md: 1 },
                flex: { md: "1.6 1 auto" },
              }}
            >
              {/* 🏷️ Title */}
              <Typography
                variant="h6"
                sx={{
                  mb: 1.5,
                  fontWeight: "bold",
                  color: "#e2e8f0",
                  letterSpacing: 0.5,
                }}
              >
                ⚡ Station Status
              </Typography>

              {/* 📦 Grid Wrapper */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(2, 220px)" },
                  rowGap: 0.5,
                  columnGap: 2,
                }}
              >
                {chargers.slice(0, 4).map((charger, index) => (
                  <motion.div
                    key={charger.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ scale: 1.06, y: -6 }}
                  >
                    <Paper
                      sx={{
                        p: 1.5,
                        height: 110,
                        borderRadius: 3,
                        backgroundColor: "#1e293b",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        gap: 0.5,
                        cursor: "pointer",
                        transition: "all 0.25s ease",
                        "&:hover": {
                          boxShadow: "0 0 14px rgba(34, 197, 94, 0.35)",
                          backgroundColor: "#233449",
                        },
                      }}
                    >
                      <Typography variant="subtitle2">
                        {charger.locationName}
                      </Typography>

                      <Typography
                        sx={{
                          color: "#22c55e",
                          fontSize: "14px",
                          fontWeight: "bold",
                        }}
                      >
                        ⚡ {charger.currentPowerKW} kW
                      </Typography>

                      <Typography sx={{ fontSize: "12px" }}>
                        🔋 {charger.batteryPercent}%
                      </Typography>

                      <Typography sx={{ fontSize: "11px", color: "#94a3b8" }}>
                        {charger.status}
                      </Typography>
                    </Paper>
                  </motion.div>
                ))}
              </Box>
            </Box>
              {/* Right panel on md, stacked on xs */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  width: "100%",
                  maxWidth: 440,
                  order: { xs: 2, md: 2 },
                  flex: { md: "0.8 1 auto" },
                }}
              >
                {/* ⚡ Total Power */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  whileHover={{ scale: 1.03, y: -6 }}
                >
                  <Paper
                    sx={{
                      p: 2,
                      borderRadius: 3,
                      backgroundColor: "#1e293b",
                      textAlign: "center",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        boxShadow: "0 0 12px rgba(34, 197, 94, 0.3)",
                        backgroundColor: "#233449",
                      },
                    }}
                  >
                    <Typography variant="subtitle1">Total Power</Typography>

                    <Typography variant="h4" fontWeight="bold">
                      {totalPower} kW
                    </Typography>

                    <Typography sx={{ fontSize: "13px", color: totalPower > 100 ? "red" : "#22c55e" }}>
                      {totalPower > 100 ? "⚠ Over limit" : "✅ Safe"}
                    </Typography>
                  </Paper>
                </motion.div>

                {/* ⚙️ Optimize Button */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleOptimize}
                    sx={{
                      backgroundColor: "#22c55e",
                      fontWeight: "bold",
                      py: 1.2,
                      "&:hover": { backgroundColor: "#16a34a" },
                    }}
                  >
                    ⚙️ AI Optimize Grid
                  </Button>
                </motion.div>

                {/* 🚗 Car Image (for md) */}
                {isMd && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <img
                      src="https://pngimg.com/uploads/tesla_car/tesla_car_PNG36.png"
                      alt="EV Car"
                      style={{
                        width: "100%",
                        height: "220px",
                        objectFit: "contain", // 🔥 important for PNG
                        filter: "drop-shadow(0px 15px 25px rgba(0,0,0,0.6))", // 🔥 floating shadow
                      }}
                    />
                  </motion.div>
                )}
              </Box>
              {/* 🚗 Car Image (for xs) */}
              {!isMd && (
                <Box sx={{ order: { xs: 1, md: 3 }, flex: { md: "0.8 1 auto" } }}>
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <img
                      src="https://pngimg.com/uploads/tesla_car/tesla_car_PNG36.png"
                      alt="EV Car"
                      style={{
                        width: "100%",
                        height: "220px",
                        objectFit: "contain", // 🔥 important for PNG
                        filter: "drop-shadow(0px 15px 25px rgba(0,0,0,0.6))", // 🔥 floating shadow
                      }}
                    />
                  </motion.div>
                </Box>
              )}
            </Box>
          </motion.div>
        </Box>
      </Box>
    </motion.div>
  );
}

export default Dashboard;