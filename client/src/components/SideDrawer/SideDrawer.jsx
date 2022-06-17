import * as React from "react";
import {
  Fab,
  Tooltip,
  SwipeableDrawer,
  Button,
  Box,
  styled,
} from "@mui/material";
import {
  Add as AddIcon,
  FilterAlt,
  CloseTwoTone,
  ExitToApp,
  ContentCopy,
} from "@mui/icons-material";
import "./SideDrawer.css";
import toast from "react-hot-toast";
import AvatarsForPlayGround from "../Avatar/AvatarsForPlayGround";
import { useNavigate } from "react-router-dom";
export default function SideDrawer({ roomId, clients }) {
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    right: false,
  });
  const toggleDrawer = (anchor, open) => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("Room Id copied to clipboard");
    } catch (err) {
      toast.error("Room Id copy failed");
    }
  };
  const leaveRoom = () => {
    navigate("/playground");
  };
  return (
    <div>
      <React.Fragment>
        <Tooltip
          onClick={toggleDrawer("right", true)}
          title="Options"
          sx={{
            position: "fixed",
            bottom: 15,
            left: { xs: 30, md: 30 },
            backgroundColor: "#ffce6d",
            "&:hover": {
              backgroundColor: "#e5b962",
            },
          }}
        >
          <Fab color="primary" aria-label="add">
            <FilterAlt sx={{ color: "#fff" }} />
          </Fab>
        </Tooltip>

        <SwipeableDrawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
          onOpen={toggleDrawer("right", true)}
          PaperProps={{
            sx: {
              backgroundColor: "#1c1e29",
            },
          }}
        >
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                marginBottom: "15px",
                marginTop: "15px",
                marginLeft: "10px",
                marginRight: "10px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box>
                <h2> Connected People</h2>
              </Box>
              <Box>
                <div className="centerPeople">
                  <div className="clientsList">
                    {clients?.map(client => (
                      <AvatarsForPlayGround
                        key={client.socketId}
                        username={client.username}
                      />
                    ))}
                  </div>
                </div>
              </Box>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Button
                variant="contained"
                color="primary_text"
                sx={{
                  "&:hover": {
                    backgroundColor: "#e5b962",
                  },
                  marginBottom: "15px",
                  marginTop: "15px",
                  marginLeft: "10px",
                  marginRight: "10px",
                }}
                onClick={copyRoomId}
              >
                <ContentCopy sx={{ mr: 1, color: "#ffffff" }} />
                Copy Room Id
              </Button>
              <Button
                variant="contained"
                color="secondary_text"
                sx={{
                  "&:hover": {
                    backgroundColor: "#e3191d",
                  },
                  marginBottom: "15px",
                  marginLeft: "10px",
                  marginRight: "10px",
                }}
                onClick={leaveRoom}
              >
                <ExitToApp sx={{ mr: 1, color: "#ffffff" }} />
                Leave
              </Button>
            </Box>
          </Box>
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}
