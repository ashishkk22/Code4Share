import React from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  styled,
} from "@mui/material";
import { Link } from "react-router-dom";
import Cards from "./PlayGround/OptionPage/Cards";
const RouterLinkH = styled(Link)({
  textDecoration: "none",
  color: "#fff",
});
const Home = () => {
  const name = `<Code4Share/>`;
  const btnName = `</> Start Coding for free`;
  return (
    <>
      <div style={{ backgroundColor: "#282a36" }}>
        <Container>
          <Box
            sx={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Container
              sx={{
                minHeight: "85vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                gutterBottom
                component="p"
                sx={{
                  color: "#fff",
                  textAlign: "center",
                  fontSize: {
                    lg: 40,
                    md: 38,
                    sm: 38,
                    xs: 38,
                  },
                }}
              >
                Welcome to{"   "}
              </Typography>
              <Typography
                gutterBottom
                variant="h3"
                component="p"
                sx={{
                  color: "#ffce6d",
                  fontSize: {
                    lg: 49,
                    md: 43,
                    sm: 38,
                    xs: 34,
                  },
                }}
              >
                {name}
              </Typography>
              <Typography
                gutterBottom
                variant="h5"
                component="p"
                sx={{
                  color: "rgb(178 186 194)",
                  paddingTop: "25px",
                  textAlign: "center",
                }}
              >
                Where teams build faster, together and from anywhere
              </Typography>
              <Typography
                gutterBottom
                variant="P"
                component="p"
                sx={{
                  color: "rgb(178 186 194)",
                  paddingTop: "25px",
                  textAlign: "center",
                }}
              >
                Create, share, and get feedback with collaborative playgrounds
                for coding or web development.
              </Typography>
              <Button
                variant="contained"
                color="primary_text"
                sx={{ marginTop: "30px" }}
                size="large"
              >
                <RouterLinkH to="/signin">{btnName}</RouterLinkH>
              </Button>
            </Container>
            <div style={{ marginTop: "40px" }}>
              <Typography
                gutterBottom
                component="p"
                sx={{
                  color: "#fff",
                  paddingTop: "50px",
                  textAlign: "center",
                  fontSize: {
                    lg: 40,
                    md: 38,
                    sm: 38,
                    xs: 38,
                  },
                }}
              >
                Code collaboration made easy
              </Typography>
              <Typography
                gutterBottom
                variant="h6"
                component="p"
                sx={{
                  color: "rgb(178 186 194)",
                  textAlign: "center",
                }}
              >
                A room Id is all you need to hop into a code4share and keep
                development work flowing.
              </Typography>
              <Box
                sx={{
                  boxShadow: 3,
                  marginTop: "14px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  src="/images/ss_demo.png"
                  alt="demo_ss"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    margin: "4px 4px 4px 4px",
                  }}
                />
              </Box>
            </div>
            <div style={{ marginTop: "40px" }}>
              <Typography
                gutterBottom
                component="p"
                sx={{
                  color: "#fff",
                  paddingTop: "50px",
                  textAlign: "center",
                  fontSize: {
                    lg: 35,
                    md: 35,
                    sm: 35,
                    xs: 35,
                  },
                }}
              >
                Supported Languages
              </Typography>
              <Cards />
              <div style={{ marginBottom: "100px" }}></div>
            </div>
            {/* <div>
              <Typography
                gutterBottom
                component="p"
                sx={{
                  color: "#fff",
                  paddingTop: "50px",
                  textAlign: "center",
                  fontSize: {
                    lg: 37,
                    md: 37,
                    sm: 37,
                    xs: 37,
                  },
                }}
              >
                Features
              </Typography>
            </div> */}
            {/* <Card
              sx={{
                width: 150,
                height: 150,
                background: "#1c1e29",
                margin: "1rem",
              }}
            >
              <Typography
                gutterBottom
                variant="h5"
                component="p"
                sx={{ color: "rgb(178 186 194)", textAlign: "center" }}
              >
                Rapid prototyping Quickly create real, working prototypes. Test
                ideas earlier and iterate more.
              </Typography>
            </Card> */}
          </Box>
        </Container>
      </div>
    </>
  );
};

export default Home;
