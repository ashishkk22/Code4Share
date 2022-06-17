import { Add as AddIcon } from "@mui/icons-material";
import {
  Button,
  Fab,
  IconButton,
  Tooltip,
  Modal,
  Box,
  Typography,
  styled,
  Avatar,
  TextField,
  Stack,
  ButtonGroup,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { v4 as uuidV4 } from "uuid";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./OptionPage.css";
import Cards from "./Cards";
const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "10px",
  alignItems: "center",
  marginBottom: "10px",
}));
const Add = () => {
  const navigate = useNavigate();
  const [optionValue, setOptionValue] = useState("html/css/js");
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const [open, setOpen] = useState(false);
  const createNewRoom = e => {
    e.preventDefault();
    const id = uuidV4();
    setRoomId(id);
    toast.success("Room id generated successfully");
  };
  const joinRoom = e => {
    if (!roomId || !username) {
      toast.error("Room id and user name are required");
      return;
    }
    if (optionValue === "html/css/js") {
      //Redirect to room
      navigate(`/webEditor/${roomId}`, {
        state: {
          username,
        },
      });
      return;
    } else if (optionValue === "c++") {
      //Redirect to room
      navigate(`/IDEcpp/${roomId}`, {
        state: {
          username,
        },
      });
      return;
    } else if (optionValue === "javascript") {
      //Redirect to room
      navigate(`/IDEjs/${roomId}`, {
        state: {
          username,
        },
      });
      return;
    } else if (optionValue === "java") {
      //Redirect to room
      navigate(`/IDEjava/${roomId}`, {
        state: {
          username,
        },
      });
      return;
    } else if (optionValue === "python") {
      //Redirect to room
      navigate(`/IDEpy/${roomId}`, {
        state: {
          username,
        },
      });
      return;
    }
  };
  return (
    <div style={{ minHeight: "90vh", backgroundColor: "#282a36" }}>
      <div className="center-divOption">
        <div className="playGroundWrapper">
          <h1 className="heading">PlayGrounds</h1>
          <p className="">
            <Typography
              gutterBottom
              variant="h6"
              component="p"
              sx={{ color: "rgb(178 186 194)", textAlign: "center" }}
            >
              Playgrounds by Code4Share are free in-browser IDE environments.
              Use them to code collaboratively with your friends, without
              downloading anything on your computer.
            </Typography>
          </p>
        </div>
        <div>
          <Typography
            gutterBottom
            variant="h6"
            component="p"
            sx={{ color: "#fff", marginTop: "15px" }}
          >
            Start coding in your favorite language
          </Typography>
        </div>
        <div className="cards_main">
          <Cards />
        </div>
      </div>
      <Tooltip
        onClick={e => setOpen(true)}
        title="select"
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
          <AddIcon sx={{ color: "white" }} />
        </Fab>
      </Tooltip>
      <div className="modal_center">
        <StyledModal
          open={open}
          onClose={e => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          color="#1c1e29"
        >
          <Box
            sx={{ backgroundColor: "#1c1e29" }}
            width={450}
            height={450}
            p={3}
            borderRadius={5}
          >
            <Typography variant="h5" color="#ffce6d" textAlign="center">
              Create PlayGround
            </Typography>
            <FormControl
              fullWidth
              sx={{ marginTop: "15px", marginBottom: "15px" }}
              color="primary_text"
            >
              <InputLabel id="demo-simple-select-label" color="primary_text">
                Select
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={optionValue}
                label="Age"
                color="primary_text"
                onChange={e => setOptionValue(e.target.value)}
              >
                <MenuItem value={"html/css/js"}>HTML/CSS/JAVASCRIPT</MenuItem>
                <MenuItem value={"c++"}>C++</MenuItem>
                <MenuItem value={"javascript"}>Javascript</MenuItem>
                <MenuItem value={"java"}>Java</MenuItem>
                <MenuItem value={"python"}>Python</MenuItem>
              </Select>
            </FormControl>
            <Typography variant="p" sx={{ marginBottom: "1px" }}>
              Paste Invitation ROOM ID
            </Typography>
            <TextField
              sx={{ width: "100%" }}
              rows={3}
              variant="filled"
              label={"ROOM ID"}
              id="ROOM ID"
              color="primary_text"
              margin="normal"
              value={roomId}
              onChange={e => setRoomId(e.target.value)}
              required
            />
            <TextField
              sx={{ width: "100%" }}
              rows={3}
              variant="filled"
              label={"User Name"}
              id="User Name"
              color="primary_text"
              margin="normal"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />

            <Button
              fullWidth
              variant="contained"
              aria-label="outlined primary button group"
              color="primary_text"
              sx={{ mt: 2 }}
              onClick={joinRoom}
            >
              Create Playground
            </Button>

            <Box m={2}>
              <Typography
                variant="p"
                sx={{ marginTop: "15px" }}
                color="primary_text"
              >
                If you don't have an invite then create {"  "}
                <Typography
                  component="a"
                  variant="p"
                  sx={{
                    color: "#ffce6d",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                  onClick={createNewRoom}
                >
                  new room
                </Typography>
              </Typography>
            </Box>
          </Box>
        </StyledModal>
      </div>
    </div>
  );
};

export default Add;
