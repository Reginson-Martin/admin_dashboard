import React, { useState, useEffect, Alert } from "react";
import axios from "axios";
import { Container, Button } from "semantic-ui-react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { logout } = useAuth();
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("failed to logout");
    }
  }

  const style_border = {
    width: "660px",
    border: "solid white",
    color: "white",
  };
  const borderRadius = {
    borderRadius: "2rem",
    border: "solid white",
    color: "white",
  };
  const background = {
    marginLeft: "0px",
    height: " 2939vh",
    width: "42vw",
    backgroundColor: "black",
  };
  const button_style = {
    color: "white",
    backgroundColor: "black",
    right: "10px",
    top: "5px",
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          position: "fixed",
          padding: "10px",
          borderBottom: "1px solid black",
          borderLeft: "1px solid black",
          borderRight: "1px solid black",
          borderBottomLeftRadius: "10px",
          borderBottomRightRadius: "10px",
          left: 0,
          width: "90vw",
          margin: "0 5vw",
          justifyContent: "space-between",
          background: "lightgray",
        }}
      >
        {error && <Alert variant="danger">{error}</Alert>}
        <h5 style={{ display: "flex", left: "30px" }}>
          <u>DASHBOARD</u>
        </h5>
       
        <Button variant="link" onClick={handleLogout} style={button_style}>
          Log Out
        </Button>
       
      </div>

      <Container style={{ marginLeft: "-90px", marginTop: "70px" }}>
        <div style={background}>
          <table className="ui celled table" style={style_border}>
            <thead>
              <tr>
                <th style={style_border}>ID</th>
                <th style={style_border}>Title</th>
                <th style={style_border}>Body</th>
                <th style={style_border}>User ID</th>
              </tr>
            </thead>
            <tbody style={style_border}>
              {data.map((item) => (
                <tr key={item.id}>
                  <td style={borderRadius}>{item.id}</td>
                  <td style={borderRadius}>{item.title}</td>
                  <td style={borderRadius}>{item.body}</td>
                  <td style={borderRadius}>{item.userId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </>
  );
}
