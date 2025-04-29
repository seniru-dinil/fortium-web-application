import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Tabs,
  Tab,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [tabValue, setTabValue] = useState("USERS");
  const navigate = useNavigate();
  const isMobile = false;

  const handleTabChange = (_event: any, newValue: string) => {
    switch (newValue) {
      case "USERS":
        navigate("/USERS");
        break;
      default:
        navigate("/USERS");
        break;
    }
  };

  return (
    <AppBar
      position="sticky"
      sx={{ bgcolor: "black", color: "white", boxShadow: 2, top: 4 }}
    >
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <Typography variant="h6" sx={{ ml: 2, fontWeight: "bold" }}>
            <span style={{ color: "white" }}>FORTIUM </span>
            <span style={{ color: "#FEBD59" }}>LOGS</span>
          </Typography>
        </Box>
        <>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            textColor="inherit"
            indicatorColor="primary"
            sx={{
              mr: 3,
              "& .MuiTabs-indicator": {
                backgroundColor: "white",
              },
            }}
          >
            <Tab
              label="MANAGE USERS"
              value="MANAGE USERS"
              sx={{ color: "white" }}
            />
          </Tabs>

          <Button
            variant="outlined"
            onClick={() => console.log("log out")}
            sx={{
              color: "white",
              borderColor: "gray",
              "&:hover": { bgcolor: "#797979" },
            }}
          >
            Logout
          </Button>
        </>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
