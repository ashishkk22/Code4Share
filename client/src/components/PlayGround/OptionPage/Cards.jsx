import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import "./Cards.css";
export default function ActionAreaCard() {
  return (
    <div className="cards">
      <Card
        sx={{ width: 150, height: 150, background: "#1c1e29", margin: "1rem" }}
      >
        <CardActionArea
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alginItems: "center",
          }}
        >
          <CardMedia
            component="img"
            height="90"
            image="/images/html_lan.png"
            alt="HTML"
            sx={{ marginTop: "10px", width: "100px" }}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="p"
              sx={{ color: "#fff" }}
            >
              HTML
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card
        sx={{ width: 150, height: 150, background: "#1c1e29", margin: "1rem" }}
      >
        <CardActionArea
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alginItems: "center",
          }}
        >
          <CardMedia
            component="img"
            height="92"
            image="/images/css_lan.png"
            alt="CSS"
            sx={{ marginTop: "10px", width: "100px" }}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="p"
              sx={{ color: "#fff" }}
            >
              CSS
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card
        sx={{ width: 150, height: 150, background: "#1c1e29", margin: "1rem" }}
      >
        <CardActionArea
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alginItems: "center",
          }}
        >
          <CardMedia
            component="img"
            height="98"
            image="/images/js_lan.png"
            alt="JS"
            sx={{ marginTop: "1px", width: "114px", marginBottom: "4px" }}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="p"
              sx={{ color: "#fff" }}
            >
              JS
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card
        sx={{ width: 150, height: 150, background: "#1c1e29", margin: "1rem" }}
      >
        <CardActionArea
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alginItems: "center",
          }}
        >
          <CardMedia
            component="img"
            height="90"
            image="/images/cpp_lan.png"
            alt="CPP"
            sx={{ marginTop: "10px", width: "100px" }}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="p"
              sx={{ color: "#fff", width: "50px" }}
            >
              C++
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card
        sx={{ width: 150, height: 150, background: "#1c1e29", margin: "1rem" }}
      >
        <CardActionArea
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alginItems: "center",
          }}
        >
          <CardMedia
            component="img"
            height="90"
            image="/images/java_lan.png"
            alt="JAVA"
            sx={{ marginTop: "10px", width: "100px" }}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="p"
              sx={{ color: "#fff" }}
            >
              JAVA
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card
        sx={{ width: 150, height: 150, background: "#1c1e29", margin: "1rem" }}
      >
        <CardActionArea
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alginItems: "center",
          }}
        >
          <CardMedia
            component="img"
            height="90"
            image="/images/py_lan.png"
            alt="HTML"
            sx={{ marginTop: "10px", width: "100px" }}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="p"
              sx={{ color: "#fff" }}
            >
              PYTHON
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}
