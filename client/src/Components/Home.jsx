import { Card, CardContent, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ProgressBar } from "react-bootstrap";

function Home() {
  const [Status, setStatus] = useState(null);
  const [username, setUsername] = useState("");
  const [appId, setAppid] = useState("");
  const navigate = useNavigate();
  const [cookie, setCookie, removeCookie] = useCookies([]);
  const token = cookie.jwt;

  const getStatus = async () => {
    const { data } = await axios.post(
      `http://localhost:4000`,
      {},
      { withCredentials: true }
    );
    setUsername(data.user);
    const appsData = await axios.get(`http://localhost:4000/status/${token}`);
    if (appsData.data.status) {
      setStatus(appsData.data.data);
      setAppid(appsData.data);
    }
  };

  useEffect(() => {
    getStatus();
  }, []);

  return (
    <div
      className="mt-5"
      style={{ display: "flex", justifyContent: "center", textAlign: "center" }}
    >
      <Card
        sx={{ maxWidth: 1500, minWidth: 1500 }}
        className="mt-5 card shadow m-5"
      >
        <CardContent style={{ textAlign: "center" }}>
          <Typography gutterBottom variant="h5" component={"div"}>
            Welcome to Incubation
          </Typography>
          <Typography variant="body2" color="green">
            <h5 className="text-uppercase">
              {" "}
              <b>{username} </b>
            </h5>
          </Typography>
        </CardContent>
        <ProgressBar>
          {Status === "New" ? (
            <ProgressBar
              striped
              variant="success"
              label="in-progress"
              now={35}
              key={1}
            />
          ) : (
            ""
          )}
          {Status === "Pending" ? (
            <ProgressBar
              striped
              variant="warning"
              label="Pending"
              now={70}
              key={1}
            />
          ) : (
            ""
          )}
          {Status === "Approved" ? (
            <ProgressBar
              striped
              variant="success"
              label="Approved"
              now={100}
              key={1}
            />
          ) : (
            ""
          )}
          {Status === "Rejected" ? (
            <ProgressBar
              striped
              variant="danger"
              label="Rejected"
              now={100}
              key={1}
            />
          ) : (
            ""
          )}
          {Status === "Booked" ? (
            <ProgressBar
              striped
              variant="succes"
              label="Your slot is booked"
              now={100}
              key={1}
            />
          ) : (
            ""
          )}
        </ProgressBar>
        <div className="mt-4">
          {!Status ? (
            ""
          ) : (
            <p
              className="btn btn-dark"
              style={{ color: "", textAlign: "center" }}
              onClick={() => {
                navigate("/viewapplication");
                localStorage.setItem("appId", JSON.stringify([appId.id]));
              }}
            >
              View Application
            </p>
          )}
        </div>
      </Card>
    </div>
  );
}

export default Home;
